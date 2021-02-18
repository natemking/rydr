const path = require('path');
const router = require('express').Router();
const apiRoutes = require('./api');

// REFERENCE TO API FOLDER/DIRECTORY
router.use("/api", apiRoutes);

// SEND TO BUILD FILE
router.use(function (req, res) {
    res.sendFile(path.join(__dirname, "..client/build/index.html"))
})

module.exports = router;
