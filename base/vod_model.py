import json
from typing import Optional

from pydantic import BaseModel, Field


class VodDetailModel(BaseModel):
    """搜索到的源"""
    url: Optional[str] = Field(..., title='链接', description="")
    title: Optional[str] = Field(..., title='标题', description="")
    checked: bool = Field(False, title='是否选中', description="用于判断是否选中")
    downloaded: bool = Field(False, title='是否已下载', description="用于判断是否已下载")
    api_name: Optional[str] = Field(None, title='接口', description="")
    api: Optional[str] = Field(None, title='接口', description="")
    wd: Optional[str] = Field(None, title='接口', description="")

    def __repr__(self):
        return self.title

    def __str__(self):
        return self.title


class VodModel(BaseModel):
    vod_id: Optional[int] = Field(None, title='视频ID', description='视频的唯一标识')
    type_id: Optional[int] = Field(None, title='类型ID', description='视频类型的唯一标识')
    type_id_1: Optional[int] = Field(None, title='子类型ID', description='视频子类型的唯一标识')
    group_id: Optional[int] = Field(None, title='分组ID', description='视频分组的唯一标识')
    vod_name: Optional[str] = Field("", title='视频名称', description='视频的名称')
    vod_sub: Optional[str] = Field("", title='视频子名称', description='视频的子名称')
    vod_en: Optional[str] = Field("", title='视频英文名称', description='视频的英文名称')
    vod_status: Optional[int] = Field(None, title='视频状态', description='视频的状态')
    vod_letter: Optional[str] = Field("", title='视频首字母', description='视频名称的首字母')
    vod_color: Optional[str] = Field('', title='视频颜色', description='视频的颜色')
    vod_tag: Optional[str] = Field("", title='视频标签', description='视频的标签')
    vod_class: Optional[str] = Field("", title='视频分类', description='视频的分类')
    vod_pic: Optional[str] = Field("", title='视频图片', description='视频的图片URL')
    vod_pic_thumb: Optional[str] = Field('', title='视频缩略图', description='视频的缩略图URL')
    vod_pic_slide: Optional[str] = Field('', title='视频幻灯片图片', description='视频的幻灯片图片URL')
    vod_pic_screenshot: Optional[str] = Field(None, title='视频截图', description='视频的截图URL')
    vod_actor: Optional[str] = Field("", title='视频演员', description='视频的演员列表')
    vod_director: Optional[str] = Field("", title='视频导演', description='视频的导演列表')
    vod_writer: Optional[str] = Field("", title='视频编剧', description='视频的编剧列表')
    vod_behind: Optional[str] = Field('', title='视频幕后', description='视频的幕后信息')
    vod_blurb: Optional[str] = Field("", title='视频简介', description='视频的简介')
    vod_remarks: Optional[str] = Field("", title='视频备注', description='视频的备注')
    vod_pubdate: Optional[str] = Field("", title='视频发布日期', description='视频的发布日期')
    vod_total: Optional[int] = Field(None, title='视频总集数', description='视频的总集数')
    vod_serial: Optional[str] = Field('', title='视频连载', description='视频的连载信息')
    vod_tv: Optional[str] = Field('', title='视频电视台', description='视频的电视台信息')
    vod_weekday: Optional[str] = Field('', title='视频播放星期', description='视频的播放星期')
    vod_area: Optional[str] = Field("", title='视频地区', description='视频的地区')
    vod_lang: Optional[str] = Field("", title='视频语言', description='视频的语言')
    vod_year: Optional[str] = Field("", title='视频年份', description='视频的年份')
    vod_version: Optional[str] = Field('', title='视频版本', description='视频的版本')
    vod_state: Optional[str] = Field('', title='视频状态', description='视频的状态')
    vod_author: Optional[str] = Field("", title='视频作者', description='视频的作者列表')
    vod_jumpurl: Optional[str] = Field('', title='视频跳转URL', description='视频的跳转URL')
    vod_tpl: Optional[str] = Field('', title='视频模板', description='视频的模板')
    vod_tpl_play: Optional[str] = Field('', title='播放模板', description='视频的播放模板')
    vod_tpl_down: Optional[str] = Field('', title='下载模板', description='视频的下载模板')
    vod_isend: Optional[int] = Field(None, title='视频是否完结', description='视频是否完结')
    vod_lock: Optional[int] = Field(None, title='视频锁定状态', description='视频的锁定状态')
    vod_level: Optional[int] = Field(None, title='视频等级', description='视频的等级')
    vod_copyright: Optional[int] = Field(None, title='视频版权', description='视频的版权状态')
    vod_points: Optional[int] = Field(None, title='视频积分', description='视频的积分')
    vod_points_play: Optional[int] = Field(None, title='播放积分', description='视频的播放积分')
    vod_points_down: Optional[int] = Field(None, title='下载积分', description='视频的下载积分')
    vod_hits: Optional[int] = Field(None, title='视频点击量', description='视频的点击量')
    vod_hits_day: Optional[int] = Field(None, title='日点击量', description='视频的日点击量')
    vod_hits_week: Optional[int] = Field(None, title='周点击量', description='视频的周点击量')
    vod_hits_month: Optional[int] = Field(None, title='月点击量', description='视频的月点击量')
    vod_duration: Optional[str] = Field('', title='视频时长', description='视频的时长')
    vod_up: Optional[int] = Field(None, title='视频点赞数', description='视频的点赞数')
    vod_down: Optional[int] = Field(None, title='视频踩数', description='视频的踩数')
    vod_score: Optional[str] = Field("", title='视频评分', description='视频的评分')
    vod_score_all: Optional[int] = Field(None, title='总评分', description='视频的总评分')
    vod_score_num: Optional[int] = Field(None, title='评分人数', description='视频的评分人数')
    vod_time: Optional[str] = Field("", title='视频时间', description='视频的时间')
    vod_time_add: Optional[int] = Field(None, title='添加时间', description='视频的添加时间')
    vod_time_hits: Optional[int] = Field(None, title='点击时间', description='视频的点击时间')
    vod_time_make: Optional[int] = Field(None, title='生成时间', description='视频的生成时间')
    vod_trysee: Optional[int] = Field(None, title='试看时间', description='视频的试看时间')
    vod_douban_id: Optional[int] = Field(None, title='豆瓣ID', description='视频的豆瓣ID')
    vod_douban_score: Optional[str] = Field("", title='豆瓣评分', description='视频的豆瓣评分')
    vod_reurl: Optional[str] = Field('', title='视频重定向URL', description='视频的重定向URL')
    vod_rel_vod: Optional[str] = Field('', title='相关视频', description='视频的相关视频')
    vod_rel_art: Optional[str] = Field('', title='相关艺术', description='视频的相关艺术')
    vod_pwd: Optional[str] = Field('', title='视频密码', description='视频的密码')
    vod_pwd_url: Optional[str] = Field('', title='密码URL', description='视频密码的URL')
    vod_pwd_play: Optional[str] = Field('', title='播放密码', description='视频的播放密码')
    vod_pwd_play_url: Optional[str] = Field('', title='播放密码URL', description='视频播放密码的URL')
    vod_pwd_down: Optional[str] = Field('', title='下载密码', description='视频的下载密码')
    vod_pwd_down_url: Optional[str] = Field('', title='下载密码URL', description='视频下载密码的URL')
    vod_content: Optional[str] = Field("", title='视频内容', description='视频的内容')
    vod_play_from: Optional[str] = Field("", title='播放来源', description='视频的播放来源')
    vod_play_server: Optional[str] = Field("", title='播放服务器', description='视频的播放服务器')
    vod_play_note: Optional[str] = Field('', title='播放备注', description='视频的播放备注')
    vod_play_url: Optional[str] = Field("", title='播放URL', description='视频的播放URL')
    vod_down_from: Optional[str] = Field('', title='下载来源', description='视频的下载来源')
    vod_down_server: Optional[str] = Field('', title='下载服务器', description='视频的下载服务器')
    vod_down_note: Optional[str] = Field('', title='下载备注', description='视频的下载备注')
    vod_down_url: Optional[str] = Field('', title='下载URL', description='视频的下载URL')
    vod_plot: Optional[int] = Field(None, title='剧情', description='视频的剧情')
    vod_plot_name: Optional[str] = Field('', title='剧情名称', description='视频剧情的名称')
    vod_plot_detail: Optional[str] = Field('', title='剧情详情', description='视频剧情的详情')
    type_name: Optional[str] = Field("", title='类型名称', description='视频类型的名称')
    url_details: Optional[list[VodDetailModel]] = Field([], title='源列表', description="")

    def __repr__(self):
        return self.vod_name

    def __str__(self):
        return self.vod_name


class VodResult(BaseModel):
    """搜索的结果"""
    vms: list[VodModel] = Field([], title='视频列表', description="")
    api_name: Optional[str] = Field(None, title='接口', description="")
    api: Optional[str] = Field(None, title='接口', description="")
    wd: Optional[str] = Field(None, title='接口', description="")
    play_url: Optional[str] = Field(None, title='接口', description="")
