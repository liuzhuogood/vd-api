import re
import threading
import time
from concurrent.futures import ThreadPoolExecutor

from loguru import logger

from common.config import Config
from base.db import DbSession
from base.db_do import DownloadDO, DownloadState
from download.m3u8_downloader import M3u8Downloader
from base.thread_safe_list import ThreadSafeList
from base.vod_model import VodModel, VodDetailModel


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
            self._list.append(do)
            do.state = DownloadState.DOWNLOADING
            self.update_state(do)
            detail: VodDetailModel = do.vod_detail
            if detail.checked:
                logger.info(f"开始下载: {do.download_name}")
                url = detail.url
                # 正则表达式模式
                pattern = r'http[s]://[^\s&]+'
                # 查找所有匹配的https地址
                matches = re.findall(pattern, url)
                # 提取最后一个https地址
                url = matches[-1] if matches else None
                M3u8Downloader(name=do.download_name,
                               url=url,
                               dist_path=do.download_path,
                               callback=self.callback,
                               callback_data=do,
                               max_workers=50 // Config.download_thread()
                               )

        except Exception as e:
            logger.error(e)
            do.state = DownloadState.FAILED
            do.error = str(e)
            self.update_state(do)
        finally:
            self._list.remove(do)

    def run(self):
        while True:
            try:
                if len(self._list) < Config.download_thread():
                    row: DownloadDO = self.scan_db()
                    if row:
                        self.executor.submit(self.submit, row)
                    else:
                        logger.info("没有数据可下载")
                        break
            except Exception as e:
                logger.error(e)
            finally:
                time.sleep(3)

    def async_run(self):
        threading.Thread(target=self.run, daemon=True).start()

    def callback(self, state: str, msg, progress: int, do: DownloadDO):
        logger.info("回调: {}-{}", msg, progress)
        if state == "error":
            logger.error(msg)
            do.state = DownloadState.FAILED
            do.error = msg
        if state == "finish":
            do.error = None
            do.progress = progress
            do.state = DownloadState.SUCCESS
        if state == "start":
            do.progress = progress
            do.state = DownloadState.DOWNLOADING
        if self.is_alive(do.download_id):
            self.update_state(do)
        else:
            logger.info("任务不存在")
            return False
        return True

    def update_state(self, do: DownloadDO):
        update = {"state": do.state}
        if do.error:
            update["error"] = do.error
        if do.progress:
            update["progress"] = do.progress
        with (DbSession() as session):
            session.query(DownloadDO).filter(DownloadDO.download_id == do.download_id).update(update)
            session.commit()
        self.emit_callback(do.download_id, do)

    def fail(self):
        """在程序重启时，就把下载中的数据重新下载"""
        with DbSession() as session:
            session.query(DownloadDO).filter(DownloadDO.state == DownloadState.DOWNLOADING).update(
                {"state": DownloadState.UNDOWNLOAD})
            session.commit()

    def clear(self, ds):
        """清除下载中的任务"""
        for d in ds:
            for i in self._list.get_list():
                if d.download_id == i.download_id:
                    logger.info("清除下载中的任务: " + d.download_name)
                    i.__stop__ = True

    def is_alive(self, download_id):
        for i in self._list.get_list():
            if download_id == i.download_id and i.__stop__:
                return False
        return True


if __name__ == '__main__':
    # 数据库地址1
    DownloadServer().run()
