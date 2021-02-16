const db = require('../models');

// DEFINING METHODS FOR THE DB CONTROLLER TO REFERENCE IN DB ROUTES
module.exports = {
    // Create user
    async createUser(req, res) {
        try {
            const data = await db.User.create(req.body);
            res.json(data);
        } catch (err) { res.status(422).json(err) };
    },
    async updateUser(req, res) {
        try {
            const data = await db.User.create(req.body);
            res.json(data);
        } catch (err) { res.status(422).json(err) };
    },
    // findAllBand: function (req, res) {
    //     db.Band
    //         .find(req.query).populate("postedReviews")
    //         .then(dbModel => res.json(dbModel))
    //         .catch(err => res.status(422).json(err));
    // },
    // JUST IN CASE: DON'T THINK WE'LL NEED IT
    async findAllBand(req,res) {
        try { 
            const data = await db.Band.find(req.query).populate("postedReviews");
            res.json(data);
        } catch (err) { res.status(422).json(err) };
    },
    // findByIdBand: function (req, res) {
    //     db.Band
    //         .findById(req.params.id).populate("postedReviews")
    //         .then(dbModel => res.json(dbModel))
    //         .catch(err => res.status(422).json(err));
    // },
    // FIND Band BY ID
    async findIdBand (req, res) {
        try {
            const data = await db.Band.findById(req.params.id).populate("postedReviews");
            res.json(data);
        } catch (err) { res.status(422).json(err) };
    },
    
}