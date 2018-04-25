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
    }
})
export default mongoose.model('message', MessageSchema)