import os
import threading
import time
from common.share import hot
import schedule
from db_hammer.util.ann import Except
from loguru import logger


@Except
def hot_update():
    logger.info("===========更新热门==============")
    hot.hots = hot.get_hots()
    logger.info("===========完成更新热门==============")


def schedule_define():
    logger.info("===========开始定时任务==============")
    schedule.every().day.at('04:00').do(hot_update)
    while True:
        time.sleep(2)
        schedule.run_pending()


def schedule_start():
    threading.Thread(target=schedule_define, daemon=True).start()
