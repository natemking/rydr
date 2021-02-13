const router = require('express').Router();
const apiController = require('../../controllers/apiController');


router.route("/search/:limit/:city/:radius")
.post(apiController.searchVenue);