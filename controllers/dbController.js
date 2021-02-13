const db = require("../models");

// DEFINING METHODS FOR THE DB CONTROLLER TO REFERENCE IN DB ROUTES
module.exports = {
    // JUST IN CASE: DON'T THINK WE'LL NEED IT
    findAllArtist: function (req, res) {
        db.Artist
            .find(req.query)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    // FIND ARTIST BY ID
    findByIdArtist: function (req, res) {
        db.Artist
            .findById(req.params.id)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    // CREATE NEW ARTIST
    createArtist: function (req, res) {
        db.Artist
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    // UPDATE ARTIST INFO
    updateArtist: function (req, res) {
        db.Artist
            .findOneAndUpdate({
                _id: req.params.id
            }, req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    // DELETE ARTIST ACCOUNT
    removeArtist: function (req, res) {
        db.Artist
            .findById({
                _id: req.params.id
            })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    // FIND VENUE BY ID
    findByIdVenue: function (req, res) {
        db.Venue
            .findById(req.params.id)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    // FIND VENUE BY NAME
    findByVenueName: function (req, res){
        db.Venue
        .find({name: {$elemMatch: {name: req.params.name}}})
    },
    // CREATE VENUE
    createVenue: function (req, res) {
        db.Venue
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    // UPDATE VENUE
    updateVenue: function (req, res) {
        db.Venue
            .findOneAndUpdate({
                _id: req.params.id
            }, req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    // FIND VENUES BY RATING
    // COULD BE CHANGED OUT WITH A SORT METHOD ON THE FRONTEND
    findByRating: function (req, res) {
        db.Venue
            .find({rating: {$elemMatch:{rating: req.params.rating}}
            }, req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
};