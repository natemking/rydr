const router = require('express').Router();
const dbRoutes = require('./dbRoutes');
const fourSquareRoute = require('./fourSquareRoutes');

router.use('/dbRoutes');
router.use('/fourSquareRoute');

router.use( (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build.index.html"));
});

module.exports = router;