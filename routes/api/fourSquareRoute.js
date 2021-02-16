const router = require('express').Router();
const apiController = require('../../controllers/apiController');


// ROUTES FOR FOURSQUARE DB
router.route("/search/:limit/:city/:radius")
// .post(apiController.postVenueApi)
.get(apiController.getVenueApi);
// .post(apiController.postVenueApi)
module.exports = router



