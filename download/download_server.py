import threading
import time
from concurrent.futures import ThreadPoolExecutor

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
        self._list = ThreadSafeList()
        self.emit_callback = callback

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
            logger.info("提交任务: " + do.download_name)

            do.state = DownloadState.DOWNLOADING
            self.update_state(CallbackData(obj=do))
            detail: VodDetailModel = do.vod_detail
            logger.info(f"开始下载: {do.download_name}")
            stop_event = threading.Event()
            dr = M3u8Downloader(name=do.download_name,
                                url=detail.url,
                                dist_path=do.download_path,
                                callback=self.callback,
                                callback_obj=do,
                                max_workers=50 // Config.download_thread(),
                                stop_event=stop_event)
            dr.start()
            self._list.append({
                "stop_event": stop_event,
                "dr": dr,
                "do": do
            })
        except Exception as e:
            logger.exception(e)
            do.state = DownloadState.FAILED
            do.error = str(e)
            self.update_state(CallbackData(obj=do))
        finally:
            self._list.remove(do)

    def run(self):
        while True:
            try:
                if len(self._list) < Config.download_thread():
                    row: DownloadDO = self.scan_db()
                    if row:
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
            # cd.obj.state = DownloadState.FAILED
            cd.obj.state = DownloadState.UNDOWNLOAD
            cd.obj.error = cd.msg
        if cd.status == CallbackState.MERGEING:
            logger.error(cd.msg)
            cd.obj.state = DownloadState.MERGEING
            cd.obj.error = cd.msg
        if cd.status == CallbackState.FINISH:
            cd.obj.error = None
            cd.obj.progress = cd.progress
            cd.obj.state = DownloadState.SUCCESS
        if cd.status in [CallbackState.START, CallbackState.DOWNLOADING]:
            cd.obj.progress = cd.progress
            cd.obj.state = DownloadState.DOWNLOADING
        if self.is_alive(cd.obj.download_id):
            self.update_state(cd)
        else:
            logger.info("任务不存在")
            return False
        return True

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

    def delete(self, do):
        """清除下载中的任务"""
        for dic in self._list.get_list():
            i = dic["do"]
            dr: M3u8Downloader = dic["dr"]
            stop_event = dic["stop_event"]
            if do.download_id == i.download_id:
                logger.info("删除下载中的任务: " + do.download_name)
                stop_event.set()

    def is_alive(self, download_id):
        for dic in self._list.get_list():
            i = dic["do"]
            dr: M3u8Downloader = dic["dr"]
            stop_event = dic["stop_event"]
            if download_id == i.download_id:
                return stop_event.is_set()
        return True


if __name__ == '__main__':
    # 数据库地址1
    DownloadServer().run()
