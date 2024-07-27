// const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const User = require('../model/userModel')
const dotenv = require('dotenv')
const { JWT_SECRET } = process.env

dotenv.config()

const cookieExtractor = function (req) {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['jwt'];
    }
    return token;
};

const opts = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: JWT_SECRET,
}


module.exports = (passport) => {
    passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
        try {
            const user = await User.findOne({ id: jwt_payload.sub });
            if (user)
                return done(null, user);
            else
                return done(null, false);
        }
        catch (err) {
            return done(err, false);
        }
    }));
}
