from loguru import logger
from retry import retry

from base.base_invoke import BaseInvoke
from base.vod_model import *


class InvokeAPI(BaseInvoke):

    def __init__(self, api=None):
        super().__init__()
        self.api = api

    @retry(Exception, tries=3, delay=1)
    def search(self, wd: str) -> VodResult:
        vr = VodResult(api_name=self.api["name"], play_url=self.api["playUrl"])
        try:
            res = self.session.get(self.api["api"], timeout=(5, 10), params={
                "wd": wd,
                "ac": "detail"
            })
            assert res.status_code == 200, res.text
            assert res.json()["code"] == 1, res.json()["msg"]

            li_list = res.json()["list"]
            for li in li_list:
                vm = VodModel(**li)
                vm.url_details = self.parse_url_details(vm.vod_play_url)
                vr.vms.append(vm)
                logger.info(vm)
        except Exception as e:
            self.logger.error(e)
        return vr

    def parse_url_details(self, detail_url):
        details = detail_url.split("#")
        rs = []
        for d in details:
            try:
                dd = d.split("$")
                title = dd[0]
                url = dd[1]
            except Exception as e:
                continue
            rs.append(VodDetailModel(title=title, url=url))
        return rs

    def test(self):
        return self.search(wd="绝命毒师")


if __name__ == '__main__':
    test = InvokeAPI()
    test.test()
