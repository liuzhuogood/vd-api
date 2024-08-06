# -*- coding: utf-8 -*-
import os
import subprocess
import time

import click
from loguru import logger


def start(port):
    script_path = os.path.abspath(
        os.path.join(os.path.dirname(os.path.dirname(__file__)), "vd-base", "base_proxy.py"))
    # 命令行启动
    argv = ['mitmdump',
            '-s', script_path,
            "--listen-host", "0.0.0.0",
            "--listen-port", str(port),
            "--set", "stream_large_bodies=1",
            # "--mode", "upstream:http://127.0.0.1:7890",
            ]
    logger.info(" ".join(argv))
    subprocess.Popen(argv, env={
        **os.environ.copy(),
        "proxy_port": str(port)
    })
    # os.system(" ".join(argv))


@click.command(help="资源抓取代理服务器", context_settings=dict(help_option_names=['-h', '--help']))
@click.option('-n', default=1, help='启动代理数量')
def process_start_all(n):
    logger.info("开启所有代理进程")
    for port in range(6000, 6000 + int(n)):
        start(port)
    while 1:
        time.sleep(3)


if __name__ == "__main__":
    process_start_all()
