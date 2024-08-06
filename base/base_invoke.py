import requests
from loguru import logger


class BaseInvoke(object):
    def __init__(self):
        self.proxy_port = 0
        self.logger = logger
        self.session = requests.Session()
        self.session_set_headers()

    def session_set_headers(self):
        self.session.headers.update({
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"
        })

    # def get_ChromiumPage(self, addr_or_opts=None) -> ChromiumPage:
    #     return ChromiumPage(addr_or_opts=addr_or_opts)
    #
    # def get_WebPage(self, chromium_options=None, proxy=False) -> WebPage:
    #     if chromium_options is None:
    #         co = ChromiumOptions()
    #     else:
    #         co = chromium_options
    #     if proxy:
    #         co.set_argument(f'--proxy-server=http://localhost:{self.proxy_port}')
    #
    #     return WebPage(chromium_options=co)
    #
    # def start_proxy(self):
    #     self.proxy_port = find_free_port(6000, 7000)
    #     if os.path.exists(file_proxy.file_path):
    #         os.remove(file_proxy.file_path)
    #     file_proxy.start(self.proxy_port)
    #
    # def stop_proxy(self):
    #     if self.proxy_port:
    #         file_proxy.stop(self.proxy_port)
    #
    # def wait_proxy_data(self, timeout=30):
    #     logger.info("开始监听代理数据")
    #     count = 0
    #     while timeout > 0:
    #         try:
    #             with open(file_proxy.file_path, "r") as f:
    #                 PROXY_CACHE = json.loads(f.read())
    #                 if len(PROXY_CACHE) > count:
    #                     count = len(PROXY_CACHE)
    #                     for i in PROXY_CACHE:
    #                         yield i
    #         except Exception as e:
    #             logger.error(e)
    #         finally:
    #             timeout -= 1
    #             time.sleep(3)

    def quit(self):
        pass

    def __del__(self):
        self.quit()
