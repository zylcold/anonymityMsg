import mongoose from 'mongoose'
import express from 'express'
import Message from '../models/message'
import User from '../models/user'

const router = express.Router()

router.post('/message/send', async (req, res) => {
    const {uid, message, images, video, audio} = req.body
    if(!message && !images && !video && !audio) {
        res.send({status: 400, message: "为空"})
        return
    }
    try{
        const user:any = await User.findOne({_id: uid})
        if(!user) {
            res.send({status: 400, message: "该用户不存在"})
            return
        }
        const newMessage = new Message({
            message: message,
            images: images,
            video: video,
            audio: audio,
            user_name: user.name
        })
        const messageItem = await newMessage.save()
        res.send({status: 200, message: "成功", messageid: messageItem._id.toString()})
    }catch(err) {
        res.send({status: 400, message: err})
    }
})

router.get('/message/messages', async (req, res) => {
    let { page, pageNum } = req.query
    page = parseInt(page)
    if(!page) {
        page = 0
    }
    pageNum = parseInt(pageNum)
    if(!pageNum) {
        pageNum = 20
    }
    
    try {
        const messages = await Message.find({}, {message:1, images:1, video:1, audio:1, post_time:1})
            .sort({'create_time.date': -1}).skip(page*pageNum).limit(pageNum)
        const totalCount = await Message.count({})
        let totalPage = {
            totalCount: totalCount,
            currentPage: page,
            pageNum: pageNum,
            totalPage: Math.ceil(totalCount / pageNum)
        }
        res.send({status: 200, message: "成功", messages: messages, pageInfo: totalPage})
    }catch(err) {
        res.send({status: 400, message: err})
    }
})

router.get('/message/:messageid', async (req, res) => {
    const messageid = req.params.messageid
    if(!messageid) {
        res.send({status:400, message: "id 为空"})
    }else {
        try {
            const message = await Message.findById(messageid)
            if(message) {
                res.send({status:200, message: message})
            }else {
                res.send({status:400, message: "id 不存在"})
            }
        }catch(err) {
            res.send({status: 400, message: err})
        }
    }

})
export default router
