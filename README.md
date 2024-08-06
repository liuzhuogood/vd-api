# vdd-视频下载

[vdd](https://github.com/liuzhuogood/vd-api.git)
本项目为自娱学习性质，不能用于商业活动，所有资源来自三方接口，作者不承担任何责任。

* 请注意资源的合法性，如有侵权尽快删除，勿相信视频中任何广告！
* 请注意资源的合法性，如有侵权尽快删除，勿相信视频中任何广告！
* 请注意资源的合法性，如有侵权尽快删除，勿相信视频中任何广告！

### Docker Run

##### 运行

```bash
docker run -d --name vdd -p 18001:18001 -v /opt/vdd/config/vod.db:/app/config/vod.db -v /opt/vdd/data:/app/data liuzhuogood/vdd:latest
```

##### 停止

```bash
docker stop vdd
```

### Docker Compose

```yaml
version: '3.8'

services:
  vdd:
    image: liuzhuogood/vdd:latest
    container_name: vdd
    ports:
      - "18001:18001"
    volumes:
      # 配置
      - /opt/vdd/config/vod.db:/app/config/vod.db
      # 下载默认目录
      - /opt/vdd/data:/app/data
    restart: always
```

#### 运行

```bash
docker compose up -d
```
##### 停止

```bash
docker stop vdd
```

### 访问

http://127.0.0.1:18001

