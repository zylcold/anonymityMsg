import express from 'express'
import fs_p from 'fs'
import Bluebird from 'bluebird'
import path from 'path'

const router = express.Router()
const fs:any = Bluebird.promisifyAll(fs_p)

router.get('/config', async (req, res)=>{
    try {
        const contents = await fs.readFileAsync(path.join(__dirname, '../../res/config.json'), 'utf8')
        res.send({status:200, ...JSON.parse(contents)})
    }catch(err) {
        res.send({status:400, error: err})
    }
})

export default router