# coding=utf-8
import base64
from datetime import timedelta, datetime
import socketio
from flask import Flask, request, make_response
from loguru import logger

import ws
from base.json_encode import CustomJSONEncoder
from common.config import Config
from common.schedule_job import schedule_start
from common.share import hot

sio = socketio.Server(cors_allowed_origins="*", json=CustomJSONEncoder)
sio.register_namespace(ws.search)
sio.register_namespace(ws.download)
sio.register_namespace(ws.setting)
app = Flask(__name__, static_folder='ui', static_url_path='/')
app.wsgi_app = socketio.WSGIApp(sio, app.wsgi_app)
logger.add('../logs/app.log', rotation="00:00", retention=timedelta(days=3), level="DEBUG")


@app.route('/', methods=['GET'])
def index():
    return app.send_static_file('index.html')


@app.route('/hot/image', methods=['GET'])
def hot_image():
    cover_url = base64.b64decode(request.args.get('cover')).decode()
    logger.info(cover_url)

    # 增加缓存
    response = make_response(hot.get_image(cover_url))
    cache_duration = 3600 * 24 * 7
    expires = datetime.utcnow() + timedelta(seconds=cache_duration)
    response.headers['Cache-Control'] = f'public, max-age={cache_duration}'
    response.headers['Expires'] = expires.strftime('%a, %d %b %Y %H:%M:%S GMT')
    return response


if __name__ == '__main__':
    try:
        logger.info('start app')
        Config.load()
        schedule_start()
        app.run(host='0.0.0.0', port=18001, threaded=True, debug=False)
    except Exception as e:
        logger.exception(e)
