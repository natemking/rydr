// Venue model //
//============//
module.exports = (mongoose, Schema) => {

    const ReviewSchema = new Schema({
        author: String,
        rating: { type: Number, required: true, min: 0, max: 5 },
        reviewText: String,
    },
    { timestamps: true });

    const VenueSchema = new Schema({
        venueName: {
            type: String,
            required: true
        },
        venueAddress: Array,
        venueReviews: [ ReviewSchema ],
    },
    { timestamps: true });

    const Venue = mongoose.model('Venue', VenueSchema);

    return Venue;
    
}