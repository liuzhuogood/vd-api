import os.path

import socketio

from common.response import success
from common.config import Config
from common.token_util import make_token

cwd = os.path.dirname(__file__)


class LoginWS(socketio.Namespace):

    def on_login(self, sid, data):
        if data['password'] == Config.login_password():
            token = make_token()  # 仅生成一个jwt token，暂不做校验
            from common.share import login_session
            login_session[token] = True
            return success({
                "token": token
            })
        else:
            return success(False)

    def on_check(self, sid, data):
        if Config.login_password() == "":
            token = make_token()  # 仅生成一个jwt token，暂不做校验
            from common.share import login_session
            login_session[token] = True
            return success({"token": token})
        c_token = data.get("token")
        from common.share import login_session
        if c_token in login_session:
            return success({"token": c_token})
        return success()

    def on_logout(self, sid, data):
        from common.share import login_session
        if data["token"] in login_session:
            del login_session[data["token"]]
        return success()
