import os.path

import socketio
from loguru import logger

from common.response import success
from base.db import DbSession
from base.db_do import DownloadDO, DownloadState
from download.download_server import DownloadServer


class DownloadWS(socketio.Namespace):
    def __init__(self, namespace):
        super().__init__(namespace)
        self.ds = DownloadServer(callback=self.on_callback)
        self.ds.async_run()

    def on_list(self, sid, data):
        with DbSession() as session:
            rs: list[DownloadDO] = session.query(DownloadDO).order_by(DownloadDO.download_id.desc()).all()
            return success(data=rs)

    def on_delete(self, sid, data):
        with DbSession() as session:
            session.query(DownloadDO).filter(DownloadDO.download_id == data["download_id"]).delete()
            session.commit()
        self.emit("delete_event", data=success(data=data, msg="删除成功"))

    def on_clear(self, sid, data):
        tag = data["tag"]
        deleted_count = 0
        if tag == "Finished":
            with DbSession() as session:
                # 执行删除操作
                deleted_count = session.query(DownloadDO).filter(DownloadDO.state == DownloadState.SUCCESS).delete()
                session.commit()
        if tag == "Failed":
            with DbSession() as session:
                # 执行删除操作
                deleted_count = session.query(DownloadDO).filter(DownloadDO.state == DownloadState.FAILED).delete()
                session.commit()
        if tag == "None":
            with DbSession() as session:
                # 执行删除操作
                ds = session.query(DownloadDO).filter(
                    DownloadDO.state == DownloadState.UNDOWNLOAD).all()
                ds_copy = ds.copy()
                for d in ds:
                    session.delete(d)
                deleted_count = len(ds)
                session.commit()

        self.emit("message", data=success(data=data, msg=f"清除{deleted_count}条记录"))
        self.emit("list", data=success())

    def on_callback(self, sid, data):
        """其实是来自下载的线程回调"""
        try:
            # 通知页面
            self.emit("download_event", data=success(data=data))
        except Exception as e:
            logger.error(e)
