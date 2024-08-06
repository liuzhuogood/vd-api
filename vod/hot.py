import base64
import json
import time
from datetime import datetime, timedelta

import requests
from loguru import logger

from base.db import DbSession
from base.db_do import HotsDO


class Hot(object):
    def __init__(self):
        self.session = requests.session()
        self.session.headers.update({
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
            'referer': 'www.douban.com'
        })
        self.hots = self.get_hots()

    def get_hots_by_db(self):
        session = DbSession()
        try:
            row: HotsDO = session.query(HotsDO).order_by(HotsDO.id.desc()).first()
            return row
        except Exception as e:
            logger.error(e)
        finally:
            session.close()

    def save_hots(self, row):
        session = DbSession()
        try:
            session.merge(row)
            session.commit()
        except Exception as e:
            logger.error(e)
        finally:
            session.close()

    def get_hots(self):
        row = self.get_hots_by_db()
        if row and row.create_time > datetime.now() - timedelta(days=1):
            return json.loads(row.data)
        res = self.session.get(
            'https://movie.douban.com/j/search_subjects?type=movie&tag=%E7%83%AD%E9%97%A8&page_limit=50&page_start=0')
        logger.info("get hot movies:{}", res.text)
        time.sleep(1)
        data1 = res.json()
        res = self.session.get(
            'https://movie.douban.com/j/search_subjects?type=tv&tag=%E7%83%AD%E9%97%A8&page_limit=50&page_start=0')
        logger.info("get hot tvs:{}", res.text)
        data2 = res.json()
        data = []
        for a in data1["subjects"] + data2["subjects"]:
            title = a['title']
            rate = a['rate']
            cover = a['cover']
            data.append({
                "title": title,
                "rate": rate,
                "cover": "/hot/image?cover=" + base64.b64encode(cover.encode()).decode()
            })
        if not row:
            row = HotsDO()
        row.data = json.dumps(data)
        self.save_hots(row)
        return data

    def get_image(self, url):
        return self.session.get(url).content


if __name__ == '__main__':
    print(Hot().get_hots)
