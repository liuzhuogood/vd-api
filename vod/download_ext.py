from base.db import DbSession
from base.db_do import DownloadDO, DownloadState
from base.vod_model import VodDetailModel


def show_downloaded_status(url_details: [VodDetailModel]):
    """显示已下载的标记， 从数据库中读取已经下载的记录，如果下载成功就打上已下的标记"""
    with (DbSession() as session):
        rs: list[DownloadDO] = session.query(DownloadDO.vod_detail).filter(
            DownloadDO.state == DownloadState.SUCCESS).all()
        been_url_map = {d.vod_detail["url"]: d.vod_detail["checked"] for d in rs}
        for ud in url_details:
            if ud.url in been_url_map:
                ud.downloaded = been_url_map[ud.url]
