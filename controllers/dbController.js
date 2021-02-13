const db = require("../models");

// Defining methods for the booksController
module.exports = {
    findAllArtist: function (req, res) {
        db.Artist
            .find(req.query)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findByIdArtist: function (req, res) {
        db.Artist
            .findById(req.params.id)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    createArtist: function (req, res) {
        db.Artist
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    updateArtist: function (req, res) {
        db.Artist
            .findOneAndUpdate({
                _id: req.params.id
            }, req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    removeArtist: function (req, res) {
        db.Artist
            .findById({
                _id: req.params.id
            })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findByIdVenue: function (req, res) {
        db.Venue
            .findById(req.params.id)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findByVenueName: function (req, res){
        db.Venue
        .find({name: {$elemMatch: {name: req.params.name}}})
    },
    createVenue: function (req, res) {
        db.Venue
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    updateVenue: function (req, res) {
        db.Venue
            .findOneAndUpdate({
                _id: req.params.id
            }, req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findByRating: function (req, res) {
        db.Venue
            .find({rating: {$elemMatch:{rating: req.params.rating}}
            }, req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
};