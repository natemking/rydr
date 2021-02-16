const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const {ExtractJwt} = require('passport-jwt')
const db = require('./models');
const {comparePassword} = require('./models/User')
require('dotenv').config();
const bcrypt = require('bcrypt')

// const cookieExtractor = req => {
//     let token = null;
//     if (req && req.cookies) {
//         token = req.cookies["access_token"];
//     }
//     console.log(token, "this is token in cookieExtractor")
//     return token;
// }

let opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.PASSPORT_SECRET_KEY,
    issuer: "Rydr",
    audience: "rydr.com"
}


// AUTHORIZATION WILL HELP PROTECT END POINTS 
passport.use(new JwtStrategy( opts, function (jwt_payload, done) {
    console.log(jwt_payload, "this is the payload")
    console.log(jwt_payload.sub)
    db.User.findById({
        _id: jwt_payload.sub
    }, (err, user) => {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
}));

// AUTHORIZATION WILL HELP PROTECT END POINTS 
// passport.use(new JwtStrategy({
//     jwtFromRequest: cookieExtractor,
//     secretOrKey: process.env.PASSPORT_SECRET_KEY
// }, (payload, done) => {
//     console.log(payload,"this is the payload")
//     console.log(payload.sub, "this is sub")
//     db.User.findById({
//         _id: payload.sub
//     }, (err, user) => {
//         if (err){
//             return done(err, false);
//         }
//         if (user){
//              return done(null, user);
//         }else{
//             return done(null, false);
//         }
//     });
// }));

// AUTHENTICATED LOCAL STRATEGY USING USERNAME AND PASSWORD
 passport.use(new LocalStrategy({
     usernameField: "userName",
     passwordField: "password"
 },(userName, password, done) => {
    db.User.findOne({
        userName: userName
    }, (err, user) => {
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
        console.log(userName, password, "I'm in passport.js in local strategy", user.password)
        // db.User.comparePassword(password, done);
        bcrypt.compare(password, user.password)
        .then (response =>{
            if (err) {throw err;}
            else{
                if(!response){
                    return done(null, isMatch, {message: "Passwords don't match"})
                }
                return done(null, user, {message: "Successful Login"})
            }
        })
    });
}));

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser((user, cb) => {
    cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
    models.user.findOne(id, (err, user) => {
        cb(err, user);
    });
});

module.exports = passport