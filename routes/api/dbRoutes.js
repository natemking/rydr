const router = require('express').Router();
const dbController = require('../../controllers/dbController');


router.route('/artist/:id')
.get(dbController.findByIdBand)
// should we use a patch instead of put?? Patch is suppposed to only update what is passed in versus the whole object.
.put(dbController.updateBand)
.delete(dbController.deleteBand);

router.route('/venue/:id')
.get(dbController.findByIdVenue)
.post(dbController.createReview)
// should we use a patch instead of put??
.put(dbController.updateReview);

router.route('/venue/:name')
.get(dbController.findByName)
.post(dbController.createVenue);

router.route('/venue/:rating')
.get(dbController.findByRating)
.put(dbController.updateReview);

module.exports = router