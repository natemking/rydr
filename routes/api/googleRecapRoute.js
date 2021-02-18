const router = require('express').Router();
const apiController = require('../../controllers/apiController');

router.route('/:userToken')
    .post(apiController.recaptchaUserVerify);

module.exports = router;