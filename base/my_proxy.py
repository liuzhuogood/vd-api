# -*- coding: utf-8 -*-
import json
import os

import subprocess
import threading
import time

import mitmproxy.http
from loguru import logger


class MyProxy:

    def __init__(self):
        self.start_time = time.time()
        self.cache = {}
        # threading.Thread(target=self.proxy_timeout, daemon=True).start()

    def proxy_timeout(self):
        while 1:
            if time.time() - self.start_time > 30:
                if mitmdump_process:
                    logger.warning(f"代理服务使用超时,退出代理服务")
                    mitmdump_process.terminate()
                break
            time.sleep(1)

    def get_resource(self, flow: mitmproxy.http.HTTPFlow):
        logger.info(
            f"抓取资源:" + flow.request.url + ",content-type:" + flow.response.headers.get("content-type",
                                                                                           ""))
        if not self.cache.get(flow.request.url, None):
            self.cache[flow.request.url] = 1
            data = {
                "content_type": flow.response.headers.get("content-type", ""),
                "url": flow.request.url,
                "headers": dict(flow.request.headers),
                "method": flow.request.method,
            }
            mitmdump_data.append(data)

    def responseheaders(self, flow: mitmproxy.http.HTTPFlow):
        content_type = flow.response.headers.get("content-type", "")
        if content_type == 'application/vnd.apple.mpegurl' or (
                content_type.startswith("video") and not flow.request.url.endswith(".ts")):
            self.get_resource(flow)


addons = [MyProxy()]

mitmdump_process = None

mitmdump_data = []


def get_data():
    global mitmdump_data

    return mitmdump_data


def start(port):
    global mitmdump_process
    argv = ['mitmdump',
            '-s', os.path.abspath(__file__),
            "--listen-host", "0.0.0.0",
            "--listen-port", str(port),
            "--set", "stream_large_bodies=1",
            # "--mode", "upstream:http://127.0.0.1:7890",
            ]
    logger.info(" ".join(argv))
    mitmdump_process = subprocess.Popen(argv)


def stop(port):
    os.system("kill -9 `lsof -i:%d -t`" % port)


if __name__ == '__main__':
    start(5555)
