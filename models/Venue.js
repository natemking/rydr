// Venue model //
//============//
module.exports = (mongoose, Schema) => {

    const VenueSchema = new Schema({
        venueName: {
            type: String,
            required: true
        },
        venueAddress: Array,
        venueReviews: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Review',
            }
        ],
    },
    { timestamps: true });

    const Venue = mongoose.model('Venue', VenueSchema);

    return Venue;
}