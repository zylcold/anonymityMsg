import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import mongoose from 'mongoose'
import passport from 'passport'
import routes from './routes'
import config from './config'


let app = express()
app.use(passport.initialize())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

routes(app)
mongoose.connect(process.env.YLINDOCKER ? config.docker_database : config.local_database).then(()=>{
    console.log("I'm connected mongodb.")
}).catch((error)=>{
    console.log(error)
});

app.get('/', (req, res) => {
    res.send("I'm OK.")
})

let server = app.listen(8081, ()=>{
    console.log("I'm ready.")
})
