const router = require('express').Router();
const dbRoutes = require('./dbRoutes');
const fourSquareRoute = require('./fourSquareRoute');
const path = require('path')

// REFERENCE BOTH DB AND FOURSQUARE ROUTES
router.use('/dbRoutes', dbRoutes);
router.use('/fourSquareRoute', fourSquareRoute);

// SEND TO BUILD FILE
router.use( (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build.index.html"));
});

module.exports = router;