const router = require('express').Router();
const apiController = require('../../controllers/apiController');
const db = require('../../models');


router.route('/:userToken')
    .post(apiController.recaptchaUserVerify);

module.exports = router;