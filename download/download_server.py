import os
import threading
import time
from concurrent.futures import ThreadPoolExecutor

from db_hammer.util.ann import Except
from loguru import logger

from base.db import DbSession
from base.db_do import DownloadDO, DownloadState
from base.thread_safe_list import ThreadSafeList
from base.vod_model import VodModel, VodDetailModel
from common.config import Config
from download.m3u8_downloader import CallbackState, CallbackData, M3u8Downloader


# noinspection PyTypeChecker
class DownloadServer(object):
    """
    为了简化，这里采用定时查询数据库记录来进行下载
    """

    def __init__(self, callback=None):
        self.fail()
        self.executor = ThreadPoolExecutor(max_workers=10)
        self.emit_callback = callback
        self.lock = threading.Lock()
        self.stop_event_map = {}

    def scan_db(self) -> DownloadDO:
        """扫描数据库"""
        session = DbSession()
        try:
            row: DownloadDO = session.query(DownloadDO).filter(DownloadDO.state == DownloadState.UNDOWNLOAD).first()
            if row:
                row.vod_model = VodModel(**row.vod_model)
                row.vod_detail = VodDetailModel(**row.vod_detail)
            return row
        except Exception as e:
            logger.error(e)
        finally:
            session.close()

    def submit(self, do: DownloadDO):
        try:
            detail: VodDetailModel = do.vod_detail
            logger.info(f"开始下载: {do.download_name}")
            dr = M3u8Downloader(name=do.download_name,
                                url=detail.url,
                                dist_path=do.download_path,
                                callback=self.callback,
                                callback_obj=do,
                                max_workers=20 // Config.download_thread(),
                                stop_event=self.stop_event_map.get(do.download_id),
                                cache_path=os.path.join(Config.download_root_path(), ".vdd_cache",
                                                        str(do.download_id)))
            dr.start()
        except Exception as e:
            logger.exception(e)
            do.state = DownloadState.FAILED
            do.error = str(e)
            self.update_state(CallbackData(obj=do))
        finally:
            pass

    def run(self):
        while True:
            try:
                with self.lock:
                    if not Config.LOADOK:
                        continue
                    if len(self.stop_event_map) >= Config.download_thread():
                        logger.info("下载线程已满")
                        continue
                    row: DownloadDO = self.scan_db()
                    if not row:
                        logger.info("没有可以下载的任务")
                        continue

                    stop_event = threading.Event()
                    self.stop_event_map[row.download_id] = stop_event
                    row.state = DownloadState.DOWNLOADING
                    self.update_state(CallbackData(obj=row))
                    logger.info("提交任务: " + row.download_name)
                    self.executor.submit(self.submit, row)
            except Exception as e:
                logger.error(e)
            finally:
                time.sleep(3)

    def async_run(self):
        threading.Thread(target=self.run, daemon=True).start()

    def callback(self, cd: CallbackData):
        logger.info("回调: {}-{}-{}", cd.speed_str, cd.msg, cd.progress)
        if cd.status == CallbackState.FAILED:
            logger.error(cd.msg)
            cd.obj.state = DownloadState.FAILED
            cd.obj.error = cd.msg
            self.delete(cd)
        if cd.status == CallbackState.MERGEING:
            logger.error(cd.msg)
            cd.obj.error = ""
            cd.obj.state = DownloadState.MERGEING
        if cd.status == CallbackState.FINISH:
            cd.obj.error = ""
            cd.obj.progress = cd.progress
            cd.obj.state = DownloadState.SUCCESS
            self.delete(cd)
        if cd.status in [CallbackState.START, CallbackState.DOWNLOADING]:
            cd.obj.progress = cd.progress
            cd.obj.state = DownloadState.DOWNLOADING
            cd.obj.error = ""
        self.update_state(cd)

    def update_state(self, cd: CallbackData):
        do = cd.obj
        update = {"state": do.state}
        if do.error:
            update["error"] = do.error
        if do.progress:
            update["progress"] = do.progress
        with (DbSession() as session):
            session.query(DownloadDO).filter(DownloadDO.download_id == do.download_id).update(update)
            session.commit()
        self.emit_callback(cd)

    def fail(self):
        """在程序重启时，就把下载中的数据重新下载"""
        with DbSession() as session:
            session.query(DownloadDO).filter(DownloadDO.state == DownloadState.DOWNLOADING).update(
                {"state": DownloadState.UNDOWNLOAD})
            session.query(DownloadDO).filter(DownloadDO.state == DownloadState.MERGEING).update(
                {"state": DownloadState.UNDOWNLOAD})
            session.commit()

    @Except
    def delete(self, cd: CallbackData):
        """清除下载中的任务"""
        if cd.obj.download_id in self.stop_event_map:
            stop_event = self.stop_event_map.get(cd.obj.download_id)
            stop_event.set()
            del self.stop_event_map[cd.obj.download_id]


if __name__ == '__main__':
    # 数据库地址1
    DownloadServer().run()
