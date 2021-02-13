const router = require('express').Router();
const dbController = require('../../controllers/dbController');


router.route('/artist/:id')
.get(dbController.findByIdBand)
.put(dbController.findByIdBand)
.put(dbController.updateBand)
.delete(dbController.deleteBand);

router.route('/venue/:id')
.get(dbController.findByIdVenue)
.post(dbController.createReview)
.update(dbController.updateReview);

router.route('/venue/:name')
.get(dbController.findByName)
.post(dbController.CreateVenue);

router.route('/venue/:rating')
.get(dbController.findByRating)
.put(dbController.updateReview);

module.exports = router