import express from 'express'
import User from '../models/user'
import config from '../config'
import bluebird from 'bluebird'
import mongoose from 'mongoose'
import { isNull } from 'util';
const router = express.Router()

interface UserReqest {
    body: { name: string, password: string }
}

router.post('/signup', async (req:UserReqest, res)=> {
    if(!req.body.name) {
        res.json({status: 400, message: '请输入账号'})
    }else {
        let newUser = new User({
            name: req.body.name,
        })
        try {
            let users = await User.find({name: req.body.name})
            if(users.length == 0) {
                await newUser.save()
                res.json({status: 200, message: '成功创建新用户'})
            }else {
                res.json({status: 400, message: '用户名已存在'})
            }
        }catch(error) {
            console.log(error)
            res.json({status: 400, message: '注册失败'})
        }

    }
})


export default router