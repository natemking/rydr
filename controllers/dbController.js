const db = require('../models');

// DEFINING METHODS FOR THE DB CONTROLLER TO REFERENCE IN DB ROUTES
module.exports = {
    // JUST IN CASE: DON'T THINK WE'LL NEED IT
    findAllBand: function (req, res) {
        db.Band
            .find(req.query).populate("postedReviews")
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    // FIND Band BY ID
    findByIdBand: function (req, res) {
        db.Band
            .findById(req.params.id).populate("postedReviews")
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    // CREATE NEW Band
    createBand: function (req, res) {
        db.Band
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    // UPDATE Band INFO
    updateBand: function (req, res) {
        db.Band
            .findOneAndUpdate({
                _id: req.params.id
            }, req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    // DELETE Band ACCOUNT
    removeBand: function (req, res) {
        db.Band
            .findById({
                _id: req.params.id
            })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findAllVenue: function (req, res) {
        db.Venue
            .find(req.query).populate('venueReviews')
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    // FIND VENUE BY ID
    findByIdVenue: function (req, res) {
        db.Venue
            .findById(req.params.id).populate('venueReview')
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    // FIND VENUE BY NAME
    findByVenueName: function (req, res){
        const name = req.params.name
        db.Venue
        .find({venueName: name}).collation( { locale: 'en', strength: 1 }).populate('venueReviews')
        .then(dbModel => {
            res.json(dbModel)})
        .catch(err => res.status(422).json(err));
    },
    // FIND VENUE BY LOCATION
    findByVenueLocation: function (req, res){
        db.Venue
        .find({})
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err))
    },
    // CREATE VENUE
    createVenue: function (req, res) {
        db.Venue
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    // FIND VENUES BY RATING
    // COULD BE CHANGED OUT WITH A SORT METHOD ON THE FRONTEND
    findByRating: function (req, res) {
        db.Venue
            .find({rating: {$elemMatch:{rating: req.params.rating}}
            }, req.body).populate('venueReviews')
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    removeVenue: function (req, res) {
    db.Venue
        .findById({
            _id: req.params.id
        })
        .then(dbModel => dbModel.remove())
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    createReview: function (req, res){
        db.Review
        .create(req.body)
        .then(dbModel =>res.json(dbModel))
        .catch(err => res.status(422).json(err))
    },
    updateReview: function (req, res){
        db.Review
        .findOneAndUpdate({_id : req.params.id}, req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err))
    },
    getReviewByBand: function (req, res){
        db.Review
        .find({author: req.params.author})
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err))
    },
    getReviewByVenue: function(req, res){
        db.Review
        .find({venue: req.params.venue})
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err))
    },
    removeReview: function (req, res) {
    db.Review
        .findById({
            _id: req.params.id
        })
        .then(dbModel => dbModel.remove())
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
};