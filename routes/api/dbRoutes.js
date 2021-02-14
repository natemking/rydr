const router = require('express').Router();
const dbController = require('../../controllers/dbController');
const db = require('../../models');

// create a new band user.
router.route('/band')
.post(dbController.createBand)
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
.put(dbController.updateReview)
.delete(dbController.removeReview);

router.route('/reviews/band/:band')
.get(dbController.getReviewByBand);

router.route('/reviews/venue/:venue')
.get(dbController.getReviewByVenue)

module.exports = router