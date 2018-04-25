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

export default router
