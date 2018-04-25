import mongoose from 'mongoose'
const Schema = mongoose.Schema
const UserSchema = new Schema({
    name: {
        type: String,
        unique: true,
        require: true
    }
})
export default mongoose.model('User', UserSchema)