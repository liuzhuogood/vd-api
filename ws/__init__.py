from ws.search_ws import SearchWS
from ws.download_ws import DownloadWS
from ws.setting_ws import SettingWS

# 单例
search = SearchWS("/search")
download = DownloadWS("/download")
setting = SettingWS("/setting")
