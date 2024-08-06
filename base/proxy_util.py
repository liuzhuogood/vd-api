import json
import time

from loguru import logger
from retry import retry


@retry(Exception, tries=5, delay=1)
def get_proxy_port(username, uuid, sio):
    proxy_rooms = sio.server.manager.rooms.get("/proxy", {})
    if proxy_rooms:
        keys = list(proxy_rooms.keys())
        logger.info(keys)
        for proxy_sid in keys:
            if proxy_sid:
                logger.info(f"去请求代理锁{username}")
                res = sio.call("lock_proxy", data={
                    "username": username,
                    "uuid": uuid,
                }, namespace="/proxy", sid=proxy_sid, timeout=3)
                logger.info(f"去请求代理锁返回{res}")
                if res:
                    return int(res), proxy_sid
    raise UserWarning("没有代理服务器")


def release_proxy(proxy_sid, sio):
    logger.info(f"去请释放锁:{proxy_sid}")
    try:
        res = sio.call("release_proxy", data={
            "username": proxy_sid
        }, namespace="/proxy", sid=proxy_sid, timeout=3)
        logger.info(f"去请释放锁返回{res}")
    except Exception as e:
        logger.error("释放锁:" + str(e))


