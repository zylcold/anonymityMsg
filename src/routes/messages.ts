import mongoose from 'mongoose'
import express from 'express'
import Message from '../models/message'

const router = express.Router()

router.post('/message/send', async (req, res) => {
    const {message, images, video, audio} = req.body
    if(!message && !images && !video && !audio) {
        res.send({status: 400, error: "为空"})
        return
    }
    const newMessage = new Message({
        message: message,
        images: images,
        video: video,
        audio: audio
    })
    try{
        const message = await newMessage.save()
        res.send({status: 200, messageid: message._id.toString()})
    }catch(err) {
        res.send({status: 400, error: err})
    }
})

router.get('/message/messages', async (req, res) => {
    try {
        const messages = await Message.find({}, '_id message images video audio create_time.minute')
        res.send({status: 200, messages: messages})
    }catch(err) {
        res.send({status: 400, error: err})
    }
})

router.get('/message/:messageid', async (req, res) => {
    const messageid = req.params.messageid
    if(!messageid) {
        res.send({status:400, error: "id 为空"})
    }else {
        try {
            const message = await Message.findById(messageid)
            if(message) {
                res.send({status:200, message: message})
            }else {
                res.send({status:400, error: "id 不存在"})
            }
        }catch(err) {
            res.send({status: 400, error: err})
        }
    }

})
export default router
