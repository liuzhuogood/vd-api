import os.path

import socketio

from common.response import success
from common.config import Config

cwd = os.path.dirname(__file__)


class SettingWS(socketio.Namespace):

    def on_setting(self, sid, data):
        obj = {}
        Config.load()
        for k, v in os.environ.items():
            obj[k] = v

        return success(data=obj)

    def on_save(self, sid, data):
        Config.save(data)
        return success()
