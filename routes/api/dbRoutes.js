const router = require('express').Router();
const dbController = require('../../controllers/dbController');
const passport = require('../../passport');
const JWT = require('jsonwebtoken');
const db = require('../../models');

//User routes for login, logout, and authenticate
router.route('/user/login')
.post(passport.authenticate('local', {session:false}),dbController.userLogin);
router.get('/user/logout', passport.authenticate('jwt',{session : false}),dbController.userLogout);
router.get('/user/authenticated',passport.authenticate('jwt',{session : false}),dbController.userAuthenticate);
router.route('/user/:id')
.get(dbController.getBandByUserId)


// create a new band user.
router.route('/band')
.post(dbController.createUser)

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

// create or find venue by name
router.route('/venue/name/:name')
.get(dbController.findByVenueName)
.post(dbController.createVenue);

// post route to create a review
router.route('/reviews')
.post(dbController.createReview);

// route for reviews that take in id parameter
router.route('/reviews/:id')
.post(dbController.createReview)
.put(dbController.updateReview)
.delete(dbController.removeReview);

// route to get reviews by band id
router.route('/reviews/band/:authorId')
.get(dbController.getReviewByBand);

// routes to get reviews by venue id
router.route('/reviews/venue/:venueId')
.get(dbController.getReviewByVenue);

router.route('/link/')
.put(dbController.updateLinks)
.get(dbController.getLinks)
.delete(dbController.deleteLink)
module.exports = router