# 注册 /api/signup
    curl 'localhost:9000/api/signup' -d 'name=zylcoldzzz'

# 配置信息 /api/config
    curl 'localhost:9000/api/config'

    response:
    {
        status: 200,
        wantuKey:string
    }

# 发送消息 /api/message/send

    curl 'localhost:8081/api/message/send' -d 'message=hello&images=122,1212&video=1212&audio=1212'

    response:
    {
        status: 200
    }
