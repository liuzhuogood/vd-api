import json
from datetime import datetime

from pydantic import BaseModel

from base.db_do import BaseDO


class CustomJSONEncoder:

    @staticmethod
    def dumps(obj, **kwargs):
        return json.dumps(obj, default=CustomJSONEncoder.default)

    @staticmethod
    def loads(s):
        return json.loads(s)

    @staticmethod
    def default(obj):
        if isinstance(obj, BaseModel):
            return obj.model_dump()
        if isinstance(obj, BaseDO):
            return obj.to_dict()
        if isinstance(obj, datetime):
            return obj.strftime('%Y-%m-%d %H:%M:%S')
        else:
            return str(obj)
