from loguru import logger

from common.response import error, StateCode


def Authorization(func):
    def wrapper(self, sid, data):
        from common.share import login_session
        session = login_session.get(data.get("token", ""))
        if not session:
            logger.error("请先登录")
            return error(msg="请先登录", code=401)
        return func(self, sid, data)

    return wrapper
