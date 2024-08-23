import os.path
import threading
from concurrent.futures import ThreadPoolExecutor

import socketio
from loguru import logger

from base.db import db_session
from base.db_do import DownloadDO, DownloadState
from base.vod_model import VodModel, VodDetailModel
from common.config import Config
from common.response import success, error
from common.share import hot
from common.util import Authorization
from vod.invoke_api import InvokeAPI

lock = threading.Lock()
cwd = os.path.dirname(__file__)
executor = ThreadPoolExecutor(max_workers=50)
config = Config()


class SearchWS(socketio.Namespace):

    def api_invoke(self, api, wd):
        logger.info("搜索:{}".format(api["name"]))
        invoke = InvokeAPI(api=api)
        result = invoke.search(wd)
        # 通知前端
        self.emit("search_event", data=success(data=result.model_dump()))

    @Authorization
    def on_search(self, sid, data):
        try:
            wd = data["wd"]
            [executor.submit(self.api_invoke, api, wd) for api in config.vod_api_list]
            return success()
        except Exception as e:
            logger.exception(e)
            return error(msg=f"解析异常:{e}")

    @Authorization
    def on_download(self, sid, data):
        """下载"""
        downloads = data["downloads"]
        vod: VodModel = VodModel(**data["vod"])
        logger.info("开始下载:{}", downloads)
        rows = []
        # 每条记录里只有一条下载
        for download in downloads:
            detail: VodDetailModel = VodDetailModel(**download["detail"])
            if detail.checked:
                download_name = vod.vod_name + "-" + detail.title
                download_path = Config().download_root_path()
                download_path = os.path.join(download_path, vod.vod_name, detail.title)

                rows.append(DownloadDO(
                    vod_model=vod.model_dump(),
                    vod_detail=detail.model_dump(),
                    download_url=detail.url,
                    download_name=download_name,
                    state=DownloadState.UNDOWNLOAD,
                    progress=0,
                    download_path=download_path))

        # 添加下载记录
        with db_session() as session:
            session.bulk_save_objects(rows)
            session.commit()
        self.emit("list", data=success(), namespace="/download")
        return success()

    @Authorization
    def on_test(self, sid, data):
        try:
            pass
        except Exception as e:
            logger.exception(e)
            return error(msg=f"解析异常:{e}")
        return success(data=data.model_dump())

    @Authorization
    def on_hots(self, sid, data):
        try:
            return success(data=hot.hots)
        except Exception as e:
            logger.exception(e)
            return error(msg=f"解析异常:{e}")


if __name__ == '__main__':
    test = SearchWS(namespace="/search")
    test.crawler_run("../../vd-crawler/search/www_kandm_cc.py", "布鲁伊")
