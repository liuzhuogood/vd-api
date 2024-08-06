# -*- coding: utf-8 -*-
import os
import threading
import time
from datetime import timedelta
import mitmproxy.http
import requests
import socketio
from loguru import logger


class MyProxy:

    def __init__(self):
        self.sio = socketio.Client()
        self.lock = False
        self.start_time = time.time()
        self.port = os.environ.get("proxy_port", 0)
        self.username = ""
        self.uuid = ""
        self.cache = {}
        threading.Thread(target=self.connect_sio, daemon=True).start()
        threading.Thread(target=self.lock_auto, daemon=True).start()

    def connect_sio(self):
        while 1:
            try:
                if not self.sio.connected:
                    self.sio.connect("ws://127.0.0.1:18001", namespaces="/proxy")
                    self.sio.on("lock_proxy", self.on_lock_proxy, namespace="/proxy")
                    self.sio.on("release_proxy", self.on_release_proxy, namespace="/proxy")
                    self.sio.on("disconnect", self.on_disconnect, namespace="/proxy")
                    logger.success(f"{self.port}.上报端连接成功")
            except socketio.exceptions.ConnectionError as e:
                logger.error(f"{self.port}.连接上报端出错")
            finally:
                time.sleep(3)

    def on_disconnect(self):
        logger.info(f"on_disconnect")

    def on_lock_proxy(self, data):
        logger.info(f"请求锁:{data}")
        if not self.lock:
            self.cache = {}
            self.lock = True
            self.username = data["username"]
            self.uuid = data["uuid"]
            self.start_time = time.time()
            logger.info(f"返回锁:{self.port}")
            return self.port
        else:
            logger.info(f"没有锁:{self.port}")
            return None

    def on_release_proxy(self, data):
        logger.info(f"释放锁:{data}")
        self.lock = False
        self.uuid = ""
        self.cache = {}
        self.start_time = time.time()
        return "ok"

    def lock_auto(self):
        while 1:
            if self.lock and time.time() - self.start_time > 60:
                logger.warning(f"代理服务[{self.port}]使用超时，自动重置")
                self.on_release_proxy("auto")
            time.sleep(1)

    def get_resource(self, flow: mitmproxy.http.HTTPFlow):
        logger.info(
            f"{self.port}.抓取资源:" + flow.request.url + ",content-type:" + flow.response.headers.get("content-type",
                                                                                                       ""))
        if not self.cache.get(flow.request.url, None):
            self.cache[flow.request.url] = 1
            self.sio.emit("found", namespace="/proxy", data={
                "content_type": flow.response.headers.get("content-type", ""),
                "url": flow.request.url,
                "headers": dict(flow.request.headers),
                "method": flow.request.method,
                "username": self.username,
                "uuid": self.uuid,
                "proxy_port": self.port
            })

    def responseheaders(self, flow):
        content_type = str(flow.response.headers.get("content-type", "")).lower()
        if content_type in ['application/vnd.apple.mpegurl', 'application/x-mpegurl'] or (
                content_type.startswith("video") and not flow.request.url.endswith(".ts")) \
                or flow.request.url.endswith(".m3u8"):
            self.get_resource(flow)


addons = [MyProxy()]
