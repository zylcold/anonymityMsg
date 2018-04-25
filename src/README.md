# 通用
## 请求参数
## 响应状态

    status 200 成功
    status 400 请求失败

# 注册
## (POST) /api/signup

    curl 'localhost:8081/api/signup' -d 'name=zylcoldzzz'

    res:
    message

# 配置信息
## (GET) /api/config

    curl 'localhost:8081/api/config'

    res:
    atkey
    skKey

# 发送消息
## (POST) /api/message/send

    curl 'localhost:8081/api/message/send' -d 'message=xxx&images=xxx,xx&video=xxx&audio=xxx'

    res:
    messageid

# 获取消息
## (GET) /api/message/messages

    curl 'localhost:8081/api/message/messages'

# 获取消息详细信息
## (GET) /api/message/:messageid

    curl 'localhost:8081/api/message/5ae03efae5f4d54c3b993190'


