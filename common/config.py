import json
import os

root_dir = os.path.abspath(os.path.dirname(os.path.dirname(__file__)))
config_path = os.path.join(root_dir, "config", 'config.json')
vod_list_path = os.path.join(root_dir, "config", 'list.json')
sqlite_path = f"sqlite:///{os.path.join(root_dir, 'config', 'vod.db')}"
default_data_path = os.path.join(root_dir, "data")


class Config:
    VOD_LIST = []
    CUSTOMER_CONFIGS = [
        "DOWNLOAD_DIR",
        "DOWNLOAD_THREAD",
        "DOWNLOAD_MODE",
        "PROXY_ENABLE",
        "HTTP_PROXY",
        "PROXY_AUTH",
        "PROXY_USERNAME",
        "PROXY_PASSWORD",
        "AUTO_UPDATE",
        "SYSTEM_THEME",
    ]

    @staticmethod
    def database_uri():
        return os.getenv("DATABASE_URI", sqlite_path)

    @staticmethod
    def download_root_path():
        return os.getenv("DOWNLOAD_ROOT_PATH", default_data_path)

    @staticmethod
    def download_thread():
        return int(os.getenv("DOWNLOAD_THREAD", 1))

    @staticmethod
    def save(data):
        if data:
            for k, v in data.items():
                if isinstance(v, bool):
                    os.environ[k] = "1" if v else "0"
                else:
                    os.environ[k] = str(v)
        d = {}
        for k, v in os.environ.items():
            if k in Config.CUSTOMER_CONFIGS:
                d[k] = v
        with open(config_path, "w+") as f:
            f.write(json.dumps(d, indent=4, ensure_ascii=False))

    @staticmethod
    def load():
        if os.path.exists(config_path):
            with open(config_path, "r") as f:
                kvs = json.loads(f.read())
                for k in kvs:
                    os.environ[str(k).upper()] = str(kvs[k])

    @property
    def vod_api_list(self) -> list:
        if not self.VOD_LIST:
            self.VOD_LIST = json.loads(open(vod_list_path, mode='r').read())
        return self.VOD_LIST
