const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const db = require('./models');
require('dotenv').config();
const bcrypt = require('bcrypt');

const cookieExtractor = req => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies["access_token"];
    }
    return token;
}

let opts = {}
    opts.jwtFromRequest = cookieExtractor,
    opts.secretOrKey = process.env.PASSPORT_SECRET_KEY,
    opts.issuer = "Rydr",
    opts.audience = "rydr.com"

// AUTHORIZATION WILL HELP PROTECT END POINTS 
passport.use(new JwtStrategy( opts, function (jwt_payload, done) {
    db.User.findById( jwt_payload.sub
    , (err, user) => {
        // ERROR GETTING TO DATA BASE
        if (err) {
            return done(err, false);
        }
        // USER DOES EXIST IN THE DB AND WE RETURN THEM 
        if (user) {
            return done(null, user);
        } 
        // NO USER EXIST WITH THE ID AND RETURN FALSE
        else {
            return done(null, false);
        }
    });
}));

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
        bcrypt.compare(password, user.password)
        .then (response =>{
            console.log(response)
            if (err) {throw err;}
            else{
                if(!response){
                    return done(null, response, {message: "Passwords don't match"})
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
    db.User.findOne(id, (err, user) => {
        cb(err, user);
    });
});

module.exports = passport
