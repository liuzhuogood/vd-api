import os
import requests
from concurrent.futures import ThreadPoolExecutor

from retry import retry


class SingleDownloader:
    def __init__(self, url, output_file, thread_num, chunk_size, retry_times):
        self.url = url
        self.output_file = output_file
        self.thread_num = thread_num
        self.chunk_size = chunk_size
        self.retry_times = retry_times
        self.total_size = None

    @retry(Exception, tries=5, delay=1)
    def _get_file_size(self):
        response = requests.head(self.url)
        response.raise_for_status()
        return int(response.headers.get('content-length', 0))

    def _download_chunk(self, start, end, thread_id):
        headers = {'Range': f'bytes={start}-{end}'}
        with requests.get(self.url, headers=headers, stream=True) as r:
            r.raise_for_status()
            with open(self.output_file, 'r+b') as f:
                f.seek(start)
                f.write(r.content)
                print(f'Thread {thread_id} finished downloading chunk {start}-{end}')

    def _download(self):
        with ThreadPoolExecutor(max_workers=self.thread_num) as executor:
            futures = []
            for i in range(0, self.total_size, self.chunk_size):
                start = i
                end = i + self.chunk_size - 1 if i + self.chunk_size < self.total_size else self.total_size - 1
                futures.append(executor.submit(self._download_chunk, start, end, i // self.chunk_size))
            for future in futures:
                future.result()

    def download(self):
        # Check if the file already exists and is complete
        if os.path.exists(self.output_file):
            current_size = os.path.getsize(self.output_file)
            if current_size == self.total_size:
                print('File is already downloaded.')
                return
            else:
                # Resume download from where it left off
                self.chunk_size = (self.total_size - current_size) // self.thread_num
                self.chunk_size += (self.total_size - current_size) % self.thread_num
                start = current_size
        else:
            start = 0

        # Get total file size if not already known
        if self.total_size is None:
            self.total_size = self._get_file_size()

        # Start the download
        self._download()


if __name__ == '__main__':
    url = 'http://example.com/largefile.zip'
    output_file = 'largefile.zip'
    thread_num = 4
    chunk_size = 1024 * 1024 * 10  # 10MB
    retry_times = 3

    downloader = SingleDownloader(url, output_file, thread_num, chunk_size, retry_times)
    downloader.download()
