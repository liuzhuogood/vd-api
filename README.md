# vdd-视频下载

[vdd](https://github.com/liuzhuogood/vd-api.git)
本项目为自娱学习性质，不能用于商业活动，所有资源来自三方接口，作者不承担任何责任。

* 请注意资源的合法性，如有侵权尽快删除，勿相信视频中任何广告！
* 请注意资源的合法性，如有侵权尽快删除，勿相信视频中任何广告！
* 请注意资源的合法性，如有侵权尽快删除，勿相信视频中任何广告！

如果觉得项目对你有帮助，请加Star鼓励吧

## 计划
- [ ] 去广告配置(尽量去除视频中插入广告片段)
- [x] 增加登录验证

##  版本更新记录
| 日期       | 内容     |
|----------|--------|
| 20240823 | 增加访问密码 |
| 20240815 | 完成搜索下载 |



<img src="https://ice.frostsky.com/2024/08/12/34dfc55eb3054cb36f2a3b23ff2384c0.png" width="800">
<img src="https://ice.frostsky.com/2024/08/23/e4847687fd6547241d642cf2bfa7d3a2.png" width="800">
<img src="https://ice.frostsky.com/2024/08/12/32ac2b4bc27be1b6306764a76cdaecea.png" width="800">
<img src="https://ice.frostsky.com/2024/08/12/2a8c868c5a306ea943b4b260795b5c48.png" width="800">

### Docker Run

##### 运行

```bash
mkdir -p /opt/vdd/config
mkdir -p /opt/vdd/data

# LOGIN_PASSWORD 为访问密码，不设置时为免密
docker run -d --name vdd -p 18001:18001 -e LOGIN_PASSWORD=123456 -v /opt/vdd/config:/app/config -v /opt/vdd/data:/app/data liuzhuogood/vdd:latest


```

##### 停止

```bash
docker stop vdd
```

### Docker Compose
`LOGIN_PASSWORD` 为访问密码，不设置时为免密
```yaml
version: '3.8'

services:
  vdd:
    image: liuzhuogood/vdd:latest
    container_name: vdd
    ports:
      - "18001:18001"
    environment:
      - LOGIN_PASSWORD:123456
    volumes:
      # 配置
      - /opt/vdd/config:/app/config
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

