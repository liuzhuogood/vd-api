from datetime import datetime

from sqlalchemy import Column, Integer, String, JSON, BIGINT, DateTime
from sqlalchemy.orm import declarative_base, Mapped

Base = declarative_base()


class DownloadState:
    UNDOWNLOAD = 0
    DOWNLOADING = 10
    PAUSED = 11
    MERGEING = 15
    SUCCESS = 20
    FAILED = 30


class BaseDO(Base):
    __abstract__ = True
    create_time: Mapped[datetime] = Column(DateTime(timezone=True), default=datetime.now)
    update_time: Mapped[datetime] = Column(DateTime(timezone=True), default=datetime.now, onupdate=datetime.now)
    delete_flag = Column(Integer, default=0, comment="是否已删除")

    def to_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}


class DownloadDO(BaseDO):
    __tablename__ = "t_download"
    __stop__ = False
    download_id: int = Column(Integer, primary_key=True, comment='下载ID', autoincrement=True)
    download_name: str = Column(String(500), comment='下载文件名')
    download_path: str = Column(String(500), comment='下载存储路径')
    download_url: str = Column(String(500), comment='下载的地址')
    vod_model: dict = Column(JSON, comment='源信息')
    vod_detail: dict = Column(JSON, comment='源信息')
    target: dict = Column(JSON, comment='下载信息')
    progress: int = Column(Integer, default=0, comment='进度')
    state: int = Column(Integer, comment='状态 0: 未下载 10: 下载中 11: 暂停中  20: 下载成功 30: 下载失败')
    error: str = Column(String(255), comment='错误信息')


class HotsDO(BaseDO):
    __tablename__ = "t_hots"
    id: int = Column(Integer, primary_key=True, comment='ID', autoincrement=True)
    data: str = Column(JSON, comment='信息')


if __name__ == '__main__':
    print(isinstance(DownloadDO(), BaseDO))
