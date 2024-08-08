import subprocess

import subprocess
import threading


def run_ffmpeg_command(command):
    process = subprocess.Popen(command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)

    def read_output(pipe):
        for line in iter(pipe.readline, ''):
            print(line.strip())
        pipe.close()

    stdout_thread = threading.Thread(target=read_output, args=(process.stdout,))
    stderr_thread = threading.Thread(target=read_output, args=(process.stderr,))

    stdout_thread.start()
    stderr_thread.start()

    stdout_thread.join()
    stderr_thread.join()

    return process.poll()


# 示例调用
command = "ffmpeg -allowed_extensions ALL -i '/Users/liuzhuo/code/vd/vd-api/data/一拳超人：英雄之路/第01集/一拳超人：英雄之路-第01集.m3u8'  -c:v copy -preset ultrafast '/Users/liuzhuo/code/vd/vd-api/data/一拳超人：英雄之路/第01集/一拳超人：英雄之路-第01集/一拳超人：英雄之路-第01集.outing.mp4'"
run_ffmpeg_command(command)
