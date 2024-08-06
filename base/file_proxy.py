# -*- coding: utf-8 -*-
import json
import os
import subprocess
import time

import mitmproxy.http
import socketio
from loguru import logger


class MyProxy:

    def __init__(self):
        self.sio = socketio.Client()
        self.start_time = time.time()
        self.cache = {}
        self.cache_data = []
        self.name = "proxy.json"

    def get_resource(self, flow: mitmproxy.http.HTTPFlow):
        logger.info(
            f"{self.name}.抓取资源:" + flow.request.url + ",content-type:" + flow.response.headers.get("content-type",
                                                                                                       ""))
        if not self.cache.get(flow.request.url, None):
            self.cache[flow.request.url] = 1
            data = {
                "content-type": str(flow.response.headers.get("content-type", "")).lower(),
                "url": flow.request.url,
                "headers": dict(flow.request.headers),
                "method": flow.request.method
            }
            self.cache_data.append(data)
            with open(file_path, 'w+') as f:
                f.write(json.dumps(self.cache_data, indent=4, ensure_ascii=False))

    def responseheaders(self, flow):
        content_type = str(flow.response.headers.get("content-type", "")).lower()
        if content_type in ['application/vnd.apple.mpegurl', 'application/x-mpegurl'] or (
                content_type.startswith("video") and not flow.request.url.endswith(".ts")) \
                or flow.request.url.endswith(".m3u8"):
            self.get_resource(flow)


addons = [MyProxy()]

mitmdump_process = None

file_path = f"{os.path.abspath(os.path.dirname(__file__))}/proxy_data.json"


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
    try:
        mitmdump_process.terminate()
    except:
        pass
    finally:
        os.system("kill -9 `lsof -i:%d -t`" % port)


if __name__ == '__main__':
    start(6000)
    while 1:
        time.sleep(3)
