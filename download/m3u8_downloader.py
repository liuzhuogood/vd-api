import base64
import logging
import os
import platform
import re
import shutil
import subprocess
import sys
import threading
import time
from collections import Counter
from concurrent.futures import ThreadPoolExecutor

import urllib3
from db_hammer.util.ann import Except
from loguru import logger
from retry import retry

from common.requests_session import RequestsSession


def make_sum():
    ts_num = 0
    while True:
        yield ts_num
        ts_num += 1


class RetryException(Exception):
    pass


class CallbackState:
    START = 0
    DOWNLOADING = 10
    MERGEING = 15
    FINISH = 20
    FAILED = 30


class CallbackData:
    def __init__(self, status: int = 0, msg: str = "", progress: float = 0, speed: float = 0, speed_str: str = "--",
                 obj=None):
        self.status = status
        self.msg = msg
        self.progress = progress
        self.speed = speed
        self.speed_str = speed_str
        self.obj = obj


def get_duplicates(lst):
    count = Counter(lst)
    return [item for item, freq in count.items() if freq > 1]


class M3u8Downloader:

    def __init__(self, name,
                 url,
                 cache_path,
                 dist_path,
                 max_workers=20,
                 base64_key=None,
                 callback=None,
                 callback_obj=None,
                 stop_event=None):
        self.cache_path = cache_path
        self._url = url
        self._name = name
        self._max_workers = max_workers
        self._file_path = os.path.join(cache_path, self._name)
        self._front_url = None
        self._ts_url_list = []
        self._success_sum = 0
        self._ts_sum = 0
        self._key = base64.b64decode(base64_key.encode()) if base64_key else None
        self.ts_name_map = {}
        self.callback = callback
        self.callback_obj = callback_obj
        self.session = RequestsSession()
        self.stop_event = stop_event
        self.dist_path = dist_path
        self.process = None  # type: subprocess

        # 下载速度统计
        self.total_bytes = 0
        self.lock = threading.Lock()
        self.start_time = None
        self.speed = 0
        self.speed_str = "0 KB/s"

        urllib3.disable_warnings()

    def start(self):
        self.get_m3u8_info()
        self.remove_duplicate_ts()

        self.start_time = time.time()
        threading.Thread(target=self.calculate_speed, daemon=True).start()

        with ThreadPoolExecutor(self._max_workers) as pool:
            for k, ts_url in enumerate(self._ts_url_list):
                name = os.path.join(self._file_path, str(k).rjust(5, '0')) + ".ts"
                pool.submit(self.download_ts, ts_url, name)
        # 等待线程池完成
        pool.shutdown(wait=True)
        if self._success_sum >= self._ts_sum - 1 and self._success_sum > 0:
            try:
                if self.callback:
                    self.callback(CallbackData(
                        status=CallbackState.MERGEING,
                        msg="视频转换中", progress=100,
                        speed=self.speed,
                        speed_str=self.speed_str,
                        obj=self.callback_obj))
                logger.info(f"下载完成,开始合并")
                self.output_mp4(self.dist_path, self._name)
                self.clear()
                if self.callback:
                    self.callback(CallbackData(
                        status=CallbackState.FINISH,
                        msg="视频转换中", progress=100,
                        speed=self.speed,
                        speed_str=self.speed_str,
                        obj=self.callback_obj))

            except Exception as e:
                logging.exception(e)
                if self.callback:
                    self.callback(CallbackData(
                        status=CallbackState.FAILED,
                        msg="视频转换失败：" + str(e), progress=100,
                        speed=self.speed,
                        speed_str=self.speed_str,
                        obj=self.callback_obj))
        else:
            if self.callback:
                self.callback(CallbackData(
                    status=CallbackState.FAILED,
                    msg="请尝试下载其他资源站点",
                    progress=0,
                    speed=self.speed,
                    speed_str=self.speed_str,
                    obj=self.callback_obj))

    def calculate_speed(self):
        while not self.stop_event.is_set():
            time.sleep(1)
            with self.lock:
                elapsed_time = time.time() - self.start_time
                self.speed = self.total_bytes / elapsed_time
                if self.speed > 1024:
                    self.speed_str = f"{self.speed / 1024 / 1024:.2f} MB/s"
                else:
                    self.speed_str = f"{self.speed / 1024:.2f} KB/s"

    @retry(Exception, tries=5, delay=1)
    def get_m3u8_info(self):
        if self.stop_event and self.stop_event.is_set():
            return
        res = self.session.get(self._url, timeout=(5, 60), verify=False)
        assert res.status_code == 200, res.text
        if res:
            self._front_url = res.url.split(res.request.path_url)[0]
            if "EXT-X-STREAM-INF" in res.text:  # 判定为顶级M3U8文件
                for line in res.text.split('\n'):
                    if line == '':
                        continue
                    if "#" in line:
                        continue
                    elif line.startswith('http'):
                        self._url = line
                    elif line.startswith('/'):
                        self._url = self._front_url + line
                    else:
                        self._url = self._url.rsplit("/", 1)[0] + '/' + line
                self.get_m3u8_info(self._url)
            else:
                m3u8_text_str = res.text
                if "button" not in m3u8_text_str:
                    self.get_ts_url(m3u8_text_str)

    def get_ts_url(self, m3u8_text_str):
        """
        获取每一个ts文件的链接
        """
        if not os.path.exists(self._file_path):
            os.makedirs(self._file_path, exist_ok=True)
        new_m3u8_str = ''
        ts = make_sum()
        for line in m3u8_text_str.split('\n'):
            if "#" in line:
                if "EXT-X-KEY" in line and "URI=" in line:
                    if os.path.exists(os.path.join(self._file_path, 'key')):
                        continue
                    key = self.download_key(line)
                    if key:
                        new_m3u8_str += f'{key}\n'
                        continue
                new_m3u8_str += f'{line}\n'
                if "EXT-X-ENDLIST" in line:
                    break
            else:
                if line.startswith('http'):
                    self._ts_url_list.append(line)
                elif line.startswith('/'):
                    self._ts_url_list.append(self._front_url + line)
                else:
                    self._ts_url_list.append(self._url.rsplit("/", 1)[0] + '/' + line)

                new_m3u8_str += os.path.join(self._file_path, str(next(ts)).rjust(5, '0') + '.ts\n')

        self._ts_sum = next(ts)
        # 写入.m3u8文件
        with open(self._file_path + '.m3u8', "wb") as f:
            if platform.system() == 'Windows':
                f.write(new_m3u8_str.encode('gbk'))
            else:
                f.write(new_m3u8_str.encode('utf-8'))

    @retry(Exception, tries=10, delay=1)
    def download_ts(self, ts_url, name):
        """
        下载 .ts 文件
        """
        if self.stop_event.is_set():
            return
        ts_url = ts_url.split('\n')[0]
        total_bytes = 0
        if not os.path.exists(name):
            with self.session.get(ts_url, stream=True, timeout=(5, 60), verify=False) as res:
                if res.status_code == 200:
                    with open(name + "_tmp", "wb+") as ts:
                        for chunk in res.iter_content(chunk_size=1024):
                            if chunk:
                                ts.write(chunk)
                                total_bytes += len(chunk)
                                with self.lock:
                                    self.total_bytes += len(chunk)

                    os.rename(name + "_tmp", name)
                    self._success_sum += 1
                    self.ts_name_map[ts_url] = name
                    sum_ = (100 * self._success_sum // self._ts_sum // 4)
                    sys.stdout.write('\r[%-25s](%d/%d)' % ("*" * sum_, self._success_sum, self._ts_sum))
                    sys.stdout.flush()

                else:
                    if os.path.exists(name):
                        os.remove(name)
                    raise RetryException(f"下载ts文件失败: {ts_url}")
        else:
            self._success_sum += 1
            self.ts_name_map[ts_url] = name

        if self.callback and (self._success_sum % 5 == 0 or self._success_sum == self._ts_sum):
            self.callback(CallbackData(
                status=CallbackState.DOWNLOADING,
                msg=f"下载进度: {self._success_sum}/{self._ts_sum}",
                progress=round(float(self._success_sum / self._ts_sum) * 100, 2),
                speed=self.speed,
                speed_str=self.speed_str,
                obj=self.callback_obj))

    @retry(Exception, tries=5, delay=1)
    def download_key(self, key_line):
        """
        下载key文件
        """
        mid_part = re.search(r"URI=[\'|\"].*?[\'|\"]", key_line).group()
        may_key_url = mid_part[5:-1]
        if self._key:
            with open(os.path.join(self._file_path, 'key'), 'wb') as f:
                f.write(self._key)
            return f'{key_line.split(mid_part)[0]}URI="./{self._name}/key"'
        if may_key_url.startswith('http'):
            true_key_url = may_key_url
        elif may_key_url.startswith('/'):
            true_key_url = self._front_url + may_key_url
        else:
            true_key_url = self._url.rsplit("/", 1)[0] + '/' + may_key_url
        try:
            with self.session.get(true_key_url, timeout=(5, 30), verify=False) as res:
                with open(os.path.join(self._file_path, 'key'), 'wb') as f:
                    f.write(res.content)
            return f'{key_line.split(mid_part)[0]}URI="./{self._name}/key"{key_line.split(mid_part)[-1]}'
        except Exception as e:
            if os.path.exists(os.path.join(self._file_path, 'key')):
                os.remove(os.path.join(self._file_path, 'key'))
            raise RetryException(f"下载key文件失败: {true_key_url}")

    def output_mp4(self, dist_path, main_name):
        """
        合并.ts文件，输出mp4格式视频，需要ffmpeg
        """
        mp4 = f"{os.path.basename(self._file_path)}.mp4"
        out_name_outing = f"{self._file_path}.outing.mp4"
        out_name = os.path.join(os.path.dirname(dist_path), mp4)
        os.makedirs(dist_path, exist_ok=True)
        if os.path.exists(out_name_outing):
            os.remove(out_name_outing)
        # cmd = f"ffmpeg -allowed_extensions ALL -i '{self._file_path}.m3u8' -acodec \
        # copy -vcodec copy -f mp4 '{out_name}'"
        # cmd = f"ffmpeg -allowed_extensions ALL -i '{self._file_path}.m3u8'  -c:v libx264  -threads 6 -preset ultrafast  '{out_name_outing}'"
        cmd = f"ffmpeg -allowed_extensions ALL -i '{self._file_path}.m3u8'  -c:v copy '{out_name_outing}'"
        logger.info(cmd)
        self.png_flag()

        thread = threading.Thread(target=self.run_command, args=(cmd,))
        thread.start()

        while not self.stop_event.is_set() and thread.is_alive():
            time.sleep(1)
        if self.stop_event.is_set():
            self.process.terminate()
            self.process.kill()
            self.delete_file()
            return

        # os.system(cmd)
        if not os.path.exists(out_name_outing):
            raise Exception("not foumd mp4")
        cmd = f"mv '{out_name_outing}' '{out_name}'"
        logger.info(cmd)
        os.system(cmd)
        self.remove_emp_dir(out_name_outing)

    @Except
    def remove_emp_dir(self, out_name_outing):
        if os.path.exists(os.path.dirname(out_name_outing)):
            os.removedirs(os.path.dirname(out_name_outing))

    def run_command(self, cmd):
        self.process = subprocess.Popen(cmd, shell=True)
        self.process.wait()

    def delete_file(self):
        file = os.listdir(self._file_path)
        for item in file:
            os.remove(os.path.join(self._file_path, item))
        os.removedirs(self._file_path)
        os.remove(self._file_path + '.m3u8')

    def png_flag(self):
        first_ts = self.ts_name_map[self._ts_url_list[0]]
        with open(first_ts, mode="rb") as f:
            first_ts_data = f.read()
            if first_ts_data[1:4] != b'PNG':
                return
        with open(first_ts, mode="rb+") as f:
            f.write(first_ts_data[0:1] + first_ts_data[4:])
        print("png delete")

    def clear(self):
        path = self._file_path
        if os.path.exists(path):
            shutil.rmtree(path, ignore_errors=True)

    def remove_duplicate_ts(self):
        """去广告"""
        try:
            duplicates = get_duplicates(self._ts_url_list)
            for d in duplicates:
                while d in self._ts_url_list:
                    self._ts_url_list.remove(d)
            for d in duplicates:
                for t in self._ts_url_list:
                    if d == t:
                        self._ts_url_list.remove(t)
        except:
            pass


if __name__ == '__main__':
    M3u8Downloader(name="test",
                   url="https://cdn.wlcdn99.com:777/SclntkdR/index.m3u8",
                   cache_path="./test",
                   dist_path="./test",
                   ).start()
