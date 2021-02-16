const router = require('express').Router();
const dbController = require('../../controllers/dbController');
const passport = require('../../passport');
const JWT = require('jsonwebtoken');
console.log(passport.authenticate("local", {session:false}), "hello");

const signToken = userID =>{
    return JWT.sign({
        iss: process.env.PASSPORT_SECRET_KEY,
        sub : userID
    },process.env.PASSPORT_SECRET_KEY,{expiresIn : "1h"});
}

router.route('/user/login')
.post(passport.authenticate('local',{session : false}),(req,res)=>{
    console.log("hello from the post route for login ")
    if(req.isAuthenticated()){
        console.log(req.user)
       const {_id, userName} = req.user[0];
       const token = signToken(_id);
       console.log(userName)
       res.cookie('access_token',token,{httpOnly: true, sameSite:true}); 
       return res.status(200).json({isAuthenticated : true, token:token,  userName : userName});
    }
})
.get(dbController.getUser);

router.get('/user/logout', passport.authenticate('jwt',{session : false}),(req,res)=>{
    res.clearCookie('access_token');
     return res.json({user:{userName : ""},success : true});
});

router.get('/user/authenticated',passport.authenticate('jwt',{session : false}),(req,res)=>{
    const {username} = req.user;
    return res.status(200).json({isAuthenticated : true, user : {userName}});
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
.delete(dbController.removeVenue);

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
.get(dbController.getReviewByVenue);

module.exports = router