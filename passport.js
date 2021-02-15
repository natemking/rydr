const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const db = require('./models');
require('dotenv').config()

const cookieExtractor = req => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies["access_token"];
    }
    console.log(token)
    return token;
}

// AUTHORIZATION WILL HELP PROTECT END POINTS 
passport.use(new JwtStrategy({
    jwtFromRequest: cookieExtractor,
    secretOrKey: process.env.PASSPORT_SECRET_KEY
}, (payload, done) => {
    db.User.findById({
        _id: payload.sub
    }, (err, user) => {
        if (err){
            return done(err, false);
        }
        if (user){
             return done(null, user);
        }else{
            return done(null, false);
        }
    });
}));

// AUTHENTICATED LOCAL STRATEGY USING USERNAME AND PASSWORD
passport.use(new LocalStrategy((userName, password, done) => {
    console.log("hello from local")
    db.User.find({
        userName: userName
    }, (err, user) => {
        console.log("hello from call back", user)
        // SOMETHING WENT WRONG WITH DATABASE WHEN LOOKING FOR USER
        if (err){
            console.log("issue with database");
            return done(err, {message:'issue with data base'});
        }
        // NO USER WITH THE INPUTTED USERNAME
        if (!user){
            console.log("No user with that userName exist")
            return done(null, false, {
                message: "No user with that userName exist"
            });
        }
        // LASTLY CHECK IF THE PASSWORD MATCHES
        console.log(userName, password, "I'm in passport.js in local strategy")
        db.User.comparePassword(password, done);
        
    });
}));