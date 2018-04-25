import mongoose from 'mongoose'
const Schema = mongoose.Schema

const MessageSchema = new Schema({
    message: {
        type: String
    },
    images: {
        type: String
    },
    video: {
        type: String
    },
    audio: {
        type: String
    },
    create_time: {
        type: Object
    }
})
interface messageInterface {
    message: string,
    images: string,
    video: string,
    audio: string,
    create_time: Object
}
MessageSchema.pre('save', function(next) {
    const message: messageInterface|any = this
    var date = new Date();
    //存储各种时间格式，方便以后扩展
    var time = {
        date: date,
        year : date.getFullYear(),
        month : date.getFullYear() + "-" + (date.getMonth() + 1),
        day : date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
        minute : date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + 
        date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) 
    }
    message.create_time = time
    next()
})
export default mongoose.model('message', MessageSchema)