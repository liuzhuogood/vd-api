from enum import Enum


class StateCode(Enum):
    SUCCESS = "200"
    WARNING = "201"
    ERROR = "501"


def success(data=None, code=StateCode.SUCCESS.value, msg="操作成功"):
    return {"code": code, "state": 'success', "data": data, "msg": msg}


def error(msg="error", code=StateCode.ERROR.value, data=None):
    return {"code": code, "state": "error", "data": data, "msg": msg}


def warning(code=StateCode.WARNING.value, data=None, msg="warn"):
    return {"code": code, "state": "warn", "data": data, "msg": msg}
