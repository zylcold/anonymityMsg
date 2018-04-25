import express from 'express'
import mysql from 'promise-mysql'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import mongoose from 'mongoose'
import passport from 'passport'
import routes from './routes'
import config from './config'

const Strategy = require('passport-http-bearer').Strategy 

let app = express()
app.use(passport.initialize())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

routes(app)

mongoose.connect(config.database).then(()=>{
  console.log("mongodb connected")
});

app.get('/', (req, res) => {
    res.send("I'm OK")
})

let server = app.listen(8081, ()=>{
    console.log('succeed')
})
