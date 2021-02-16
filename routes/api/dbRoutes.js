const router = require('express').Router();
const dbController = require('../../controllers/dbController');
const passport = require('../../passport');
const JWT = require('jsonwebtoken');


const signToken = userID =>{
    return JWT.sign({
        iss: "Rydr",
        sub : userID,
        aud: "rydr.com"
    }, process.env.PASSPORT_SECRET_KEY,{expiresIn : "3h"});
    
}

router.route('/user/login')
.post(passport.authenticate('local',{session : false}),(req,res)=>{
    if(req.isAuthenticated()){
       console.log(req.user, "the user")
       const {_id, userName} = req.user;
       const token = signToken(_id);
       console.log('right before verify')
       JWT.verify(token, process.env.PASSPORT_SECRET_KEY, function (err, decoded) {
            if (!err) {
                console.log('Verify: Async test 1: Audience decoded: ' + decoded.aud)
            } else {
                console.log("Verify: Async test 1: " + err.message);
            }})
       res.cookie("access_token", token, {httpOnly: true, sameSite:true}); 
       return res.status(200).json({isAuthenticated : true, token:token,  userName : userName});
    }
})
// .get(dbController.getUser);

router.get('/user/logout', passport.authenticate('jwt',{session : false}),(req,res)=>{
    res.clearCookie('access_token');
    console.log(res.cookie)
     return res.json({user:{userName : ""},success : true});
});

router.get('/user/authenticated',passport.authenticate('jwt',{session : false}),(req,res)=>{
    console.log("hello")
    console.log(req.user)
    const {userName} = req.user;
    return res.status(200).send({isAuthenticated : true, userName : userName});
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