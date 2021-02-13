const router = require('express').Router();
const dbRoutes = require('./dbRoutes');
const fourSquareRoute = require('./fourSquareRoutes');

// REFERENCE BOTH DB AND FOURSQUARE ROUTES
router.use('/dbRoutes');
router.use('/fourSquareRoute');

// SEND TO BUILD FILE
router.use( (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build.index.html"));
});

module.exports = router;