import base64
import logging
import os
import platform
import re
import sys
from concurrent.futures import ThreadPoolExecutor

import requests
import urllib3
from loguru import logger


def make_sum():
    ts_num = 0
    while True:
        yield ts_num
        ts_num += 1


class M3u8Downloader:
    """
    :param name: 保存m3u8的文件名 如"index"
    :param max_workers: 多线程最大线程数
    :param num_retries: 重试次数
    :param base64_key: base64编码的字符串
    """

    def __init__(self, name, url, dist_path, max_workers=20, num_retries=10, base64_key=None, callback=None,
                 callback_data=None):
        self._url = url
        self._name = name
        self._max_workers = max_workers
        self._num_retries = num_retries
        self._file_path = os.path.join(dist_path, self._name)
        self._front_url = None
        self._ts_url_list = []
        self._success_sum = 0
        self._ts_sum = 0
        self._key = base64.b64decode(base64_key.encode()) if base64_key else None
        self._headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) \
        AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36'}
        self.ts_name_map = {}
        self.callback = callback
        self.callback_data = callback_data
        self.stop = False

        urllib3.disable_warnings()
        self.get_m3u8_info(self._url, self._num_retries)
        print('Downloading: %s' % self._name, 'Save path: %s' % self._file_path, sep='\n')
        with ThreadPoolExecutor(self._max_workers) as pool:
            for k, ts_url in enumerate(self._ts_url_list):
                name = os.path.join(self._file_path, str(k)) + ".ts"
                pool.submit(self.download_ts, ts_url, name, self._num_retries)
        # 等待线程池完成
        pool.shutdown(wait=True)
        if self.stop:
            logger.info("下载中断")
            return
        if self._success_sum >= self._ts_sum - 1 and self._success_sum > 0:
            try:
                logger.info(f"下载完成,开始合并")
                self.output_mp4(dist_path, self._name)
                if self.callback:
                    self.callback("finish", "下载完成", 100, self.callback_data)
            except Exception as e:
                logging.exception(e)
        else:
            if self.callback:
                self.callback("error", "下载失败", 0, self.callback_data)

    def requests_get(self, url, num_retries):
        try:
            with requests.get(url, timeout=(5, 30), verify=False, headers=self._headers) as res:
                return res
        except Exception as e:
            print(e)
            if num_retries > 0:
                return self.requests_get(url, num_retries - 1)

    def get_m3u8_info(self, m3u8_url, num_retries):
        """
        获取m3u8信息
        """
        res = self.requests_get(m3u8_url, num_retries)
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
                self.get_m3u8_info(self._url, self._num_retries)
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
                    key = self.download_key(line, 5)
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
                new_m3u8_str += (os.path.join(self._file_path, str(next(ts))) + '.ts\n')
        self._ts_sum = next(ts)
        with open(self._file_path + '.m3u8', "wb") as f:
            if platform.system() == 'Windows':
                f.write(new_m3u8_str.encode('gbk'))
            else:
                f.write(new_m3u8_str.encode('utf-8'))

    def download_ts(self, ts_url, name, num_retries):
        """
        下载 .ts 文件
        """
        if self.stop:
            logger.info("下载中断")
            return
        ts_url = ts_url.split('\n')[0]
        try:
            if not os.path.exists(name):
                with requests.get(ts_url, stream=True, timeout=(5, 60), verify=False, headers=self._headers) as res:
                    if res.status_code == 200:
                        with open(name, "wb") as ts:
                            for chunk in res.iter_content(chunk_size=1024):
                                if chunk:
                                    ts.write(chunk)
                        self._success_sum += 1
                        self.ts_name_map[ts_url] = name
                        sum_ = (100 * self._success_sum // self._ts_sum // 4)
                        sys.stdout.write('\r[%-25s](%d/%d)' % ("*" * sum_, self._success_sum, self._ts_sum))
                        sys.stdout.flush()

                    else:
                        self.download_ts(ts_url, name, num_retries - 1)
                        return
            else:
                self._success_sum += 1
                self.ts_name_map[ts_url] = name

            # callback
            if self.callback and (self._success_sum % 5 == 0 or self._success_sum == self._ts_sum):
                self.stop = not self.callback("start",
                                              "",
                                              round(float(self._success_sum / self._ts_sum) * 100, 2)
                                              , self.callback_data)

        except Exception as e:
            if os.path.exists(name):
                os.remove(name)
            if num_retries > 0:
                self.download_ts(ts_url, name, num_retries - 1)

    def download_key(self, key_line, num_retries):
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
            with requests.get(true_key_url, timeout=(5, 30), verify=False, headers=self._headers) as res:
                with open(os.path.join(self._file_path, 'key'), 'wb') as f:
                    f.write(res.content)
            return f'{key_line.split(mid_part)[0]}URI="./{self._name}/key"{key_line.split(mid_part)[-1]}'
        except Exception as e:
            print(e)
            if os.path.exists(os.path.join(self._file_path, 'key')):
                os.remove(os.path.join(self._file_path, 'key'))
            print("加密视频,无法加载key,揭秘失败")
            if num_retries > 0:
                self.download_key(key_line, num_retries - 1)

    def output_mp4(self, dist_path, main_name):
        """
        合并.ts文件，输出mp4格式视频，需要ffmpeg
        """
        mp4 = f"{os.path.basename(self._file_path)}.mp4"
        out_name_outing = f"{os.path.join(dist_path, main_name, os.path.basename(self._file_path))}.outing.mp4"
        out_name = os.path.join(os.path.dirname(dist_path), mp4)
        os.makedirs(f"{os.path.join(dist_path, main_name)}/", exist_ok=True)
        # cmd = f"ffmpeg -allowed_extensions ALL -i '{self._file_path}.m3u8' -acodec \
        # copy -vcodec copy -f mp4 '{out_name}'"
        cmd = f"ffmpeg -allowed_extensions ALL -i '{self._file_path}.m3u8'  -c:v libx264  -threads 6 -preset ultrafast  '{out_name_outing}'"
        logger.info(cmd)
        self.png_flag()
        os.system(cmd)
        if not os.path.exists(out_name_outing):
            raise Exception("not foumd mp4")
        cmd = f"mv '{out_name_outing}' '{out_name}'"
        logger.info(cmd)
        os.system(cmd)

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
