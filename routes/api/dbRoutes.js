const router = require('express').Router();
const dbController = require('../../controllers/dbController');
const db = require('../../models');
// const User = require('../../models/User')
const passport = require('passport');
const passportConfig = require('../../passport');
const JWT = require('jsonwebtoken');
require('dotenv').config()


const signToken = userID =>{
    return JWT.sign({
        iss: 'rydr admin',
        sub : userID
    },process.env.PASSPORT_SECRET_KEY,{expiresIn : "1h"});
}

router.post('/user/login',passport.authenticate('local',{session : false}),(req,res)=>{
    if(req.isAuthenticated()){
        console.log(signToken);
       const {_id, userName} = req.user;
       const token = signToken(_id);
       res.cookie('access_token',token,{httpOnly: true, sameSite:true}); 
       res.status(200).json({isAuthenticated : true, user : userName});
    }
});

// router.route('/user/login')
// .post(passport.authenticate('local',{session : false}),(req,res)=>{
//     console.log(signToken);
//     if(req.isAuthenticated()){
//        const {_id, userName} = req.user;
//        const token = signToken(_id);
//        res.cookie('access_token',token,{httpOnly: true, sameSite:true}); 
//        res.status(200).json({isAuthenticated : true, user : userName});
//     }
//     console.log(token);
// })
// .get(dbController.getUser);

router.post('/user/register', (req,res) => {
    console.log(req.body)
    const{ userName, password } =req.body;
    db.User.find({userName}, (err,user)=>{
        console.log(user);
        if(err)
        res.status(500).json({message: 'Error has occured', msgError: true })
        if(user)
        res.status(400).json({message: 'Username is already taken', msgError: true })
        else{
            const newUser = new User({userName, password});
            newUser.save(err=>{
                if (err) {
                    res.status(500).json({message: 'Error has occured', msgError: true })
                } else 
                res.status(201).json({message: 'Account successfull', msgError: false })
            })
        }
    })
})

router.get('/user/logout', passport.authenticate('jwt',{session : false}),(req,res)=>{
    res.clearCookie('access_token');
    res.json({user:{userName : ""},success : true});
});

router.get('/user/authenticated',passport.authenticate('jwt',{session : false}),(req,res)=>{
    const {username} = req.user;
    res.status(200).json({isAuthenticated : true, user : {userName}});
});

// create a new band user.
router.route('/band')
.post(dbController.createUser)
.get(dbController.findAllBand);

// all routes to manipulate band data by id
router.route('/band/:id')
.get(dbController.findByIdBand)
.put(dbController.updateBand)
.delete(dbController.removeBand);

// get all venues from db
router.route('/venue')
.get(dbController.findAllVenue);

// all routes to manipulate venue data by id
router.route('/venue/:id')
.get(dbController.findByIdVenue)
.post(dbController.createVenue)
.delete(dbController.removeVenue)

// create or find venue by name
router.route('/venue/name/:name')
.get(dbController.findByVenueName)
.post(dbController.createVenue);

// find venue by ratings
router.route('/venue/rating/:rating')
.get(dbController.findByRating);

router.route('/reviews')
.post(dbController.createReview);

router.route('/reviews/:id')
.post(dbController.createReview)
.put(dbController.updateReview)
.delete(dbController.removeReview);

router.route('/reviews/band/:authorId')
.get(dbController.getReviewByBand);

router.route('/reviews/venue/:venueId')
.get(dbController.getReviewByVenue)

module.exports = router