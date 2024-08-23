import os.path

import socketio
from loguru import logger

from base.vod_model import VodModel
from common.response import success
from base.db import DbSession
from base.db_do import DownloadDO, DownloadState
from common.util import Authorization
from download.download_server import DownloadServer
from download.m3u8_downloader import CallbackData
from vod.invoke_api import InvokeAPI


class DownloadWS(socketio.Namespace):
    def __init__(self, namespace):
        super().__init__(namespace)
        self.ds = DownloadServer(callback=self.on_callback)
        self.ds.async_run()

    @Authorization
    def on_list(self, sid, data):
        with DbSession() as session:
            rs: list[DownloadDO] = session.query(DownloadDO).order_by(DownloadDO.download_id.desc()).all()
            return success(data=rs)

    @Authorization
    def on_delete(self, sid, data):
        with DbSession() as session:
            session.query(DownloadDO).filter(DownloadDO.download_id == data["download_id"]).delete()
            session.commit()
        self.ds.delete(CallbackData(obj=DownloadDO(**data)))
        self.emit("delete_event", data=success(data=data, msg="删除成功"))
        return success()

    @Authorization
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
        return success()

    def on_callback(self, cd: CallbackData):
        """其实是来自下载的线程回调"""
        try:
            # 通知页面
            data = {**cd.obj.to_dict(), "speed_str": cd.speed_str, "speed": cd.speed}
            self.emit("download_event", data=success(data=data))
        except Exception as e:
            logger.error(e)

    @Authorization
    def on_retry(self, sid, data):
        vod: VodModel = VodModel(**data["vod"])
        with DbSession() as session:
            do: DownloadDO = session.query(DownloadDO).filter(DownloadDO.download_id == data["download_id"]).first()
        api = {
            "name": do.vod_detail["api_name"],
            "api": do.vod_detail["api"],
        }
        invoke = InvokeAPI(api=api)
        result = invoke.search(do.vod_detail["wd"])

        # 找出匹配的结果，找不到就返回原来的结果
        for vm in result.vms:
            if vm.vod_id == do.vod_model["vod_id"]:
                return success(data=vm)
        return success(data=vod)
