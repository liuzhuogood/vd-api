# -*- coding: utf-8 -*-
from loguru import logger
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from common.config import Config
from base.db_do import *

# 创建引擎
engine = create_engine(Config.database_uri(), echo=False, pool_size=5, pool_recycle=60, max_overflow=5)
# 绑定引擎
DbSession = sessionmaker(bind=engine, autoflush=False)
# 创建数据库链接池，直接使用session即可为当前线程拿出一个链接对象conn
# 内部会采用threading.local进行隔离
# session = scoped_session(db_session)
# 创建线程本地数据对象
# thread_local = threading.local()

# 自动创建表
DownloadDO.__table__.create(bind=engine, checkfirst=True)
HotsDO.__table__.create(bind=engine, checkfirst=True)

logger.info("数据库连接成功")


def db_session():
    return DbSession()

