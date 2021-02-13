const router = require('express').Router();
const dbController = require('../../controllers/dbController');

// create a new artist user.
router.route('/artist')
.post(dbController.createArtist);

// all routes to manipulate artist data by id
router.route('/artist/:id')
.get(dbController.findByIdArtist)
// should we use a patch instead of put?? Patch is suppposed to only update what is passed in versus the whole object.
.put(dbController.updateArtist)
.delete(dbController.removeArtist);

// all routes to manipulate venue data by id
router.route('/venue/:id')
.get(dbController.findByIdVenue)
.post(dbController.createVenue)
// should we use a patch instead of put??
.put(dbController.updateVenue);

// create or find venue by name
router.route('/venue/:name')
.get(dbController.findByVenueName)
.post(dbController.createVenue);

// find venue by ratings
router.route('/venue/:rating')
.get(dbController.findByRating);

module.exports = router