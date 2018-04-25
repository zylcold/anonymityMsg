import passport from 'passport'
import User from './models/user'
import config from './config'
import user from './models/user';
import httpBearer from 'passport-http-bearer'
const Strategy = httpBearer.Strategy 

export default function (passport:passport.Authenticator) {
    passport.use(new Strategy(
        (token, done)=> {
            User.findOne({
                token: token
            }, (err, user)=> {
                if(err) {
                    return done(err)
                }
                if(!user) {
                    return done(null, false)
                }
                return done(null, user)
            })
        }
    ))
}
