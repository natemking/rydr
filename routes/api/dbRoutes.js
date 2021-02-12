const router = require('express').Router();
const dbController = require('../../controllers/dbController');

router.route("/:id")
.get(dbController.findById);
