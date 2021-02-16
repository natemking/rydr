const router = require('express').Router();
const dbController = require('../../controllers/dbController');
const passport = require('../../passport');
const JWT = require('jsonwebtoken');

//User routes for login, logout, and authenticate
router.route('/user/login')
.post(passport.authenticate('local', {session:false}),dbController.userLogin);
router.get('/user/logout', passport.authenticate('jwt',{session : false}),dbController.userLogout);
router.get('/user/authenticated',passport.authenticate('jwt',{session : false}),dbController.userAuthenticate);

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