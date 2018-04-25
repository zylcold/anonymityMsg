import express from 'express'
import userRouter from './users'
import configRouter from './config'
import messagesRouter from './messages'
export default (app: express.Express) => {
    //配置
    app.use('/api', configRouter)
    //用户
    app.use('/api', userRouter)
    //消息
    app.use('/api', messagesRouter)
}

