# 使用多架构支持的基础镜像
FROM --platform=$BUILDPLATFORM python:3.12-slim AS builder

# 设置环境变量
ENV TZ=Asia/Shanghai
ENV LANG=C.UTF-8
ENV LC_ALL=C.UTF-8

# 安装基本依赖、Rust 工具链和 ffmpeg
RUN apt-get update && apt-get install -y \
    curl \
    build-essential \
    tzdata \
    ffmpeg \
    && curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y \
    && cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && echo "Asia/Shanghai" > /etc/timezone

# 设置PATH环境变量
ENV PATH="/root/.cargo/bin:${PATH}"

# 设置工作目录
WORKDIR /app

# 复制项目文件
COPY . .

# 安装Python依赖
RUN pip install --no-cache-dir -r requirements.txt

# 清理 Rust 工具链
RUN rm -rf /root/.cargo

# 运行阶段
FROM --platform=$TARGETPLATFORM python:3.12-slim

# 设置环境变量
ENV TZ=Asia/Shanghai
ENV LANG=C.UTF-8
ENV LC_ALL=C.UTF-8

# 仅复制必要的文件
COPY --from=builder /app /app

# 设置工作目录
WORKDIR /app

# 安装 tzdata 和 ffmpeg
RUN apt-get update && apt-get install -y \
    tzdata \
    ffmpeg \
    && pip install --no-cache-dir -r requirements.txt \
    && cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && echo "Asia/Shanghai" > /etc/timezone \
    && apt-get clean && rm -rf /var/lib/apt/lists/*



# 暴露端口
EXPOSE 18001

# 设置默认命令
CMD [ "python3", "app.py" ]