const router = require('express').Router();
const dbController = require('../../controllers/dbController');


router.route('/artist/:id')
.get(dbController.findByIdArtist)
// should we use a patch instead of put?? Patch is suppposed to only update what is passed in versus the whole object.
.put(dbController.updateArtist)
.delete(dbController.removeArtist);

router.route('/artist')
.post(dbController.createArtist);

router.route('/venue/:id')
.get(dbController.findByIdVenue)
.post(dbController.createReview)
// should we use a patch instead of put??
.put(dbController.updateReview);

router.route('/venue/:name')
.get(dbController.findByVenueName)
.post(dbController.createVenue);

router.route('/venue/:rating')
.get(dbController.findByRating)
.put(dbController.updateReview);

module.exports = router