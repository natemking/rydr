// Band model //
//============//
module.exports = (mongoose, Schema) => {
    const BandSchema = new Schema({
        bandName: {
            type: String,
            required: true
        },
        bandImg: String,
        bandBio: String,
        bandLinks: [
            {
                siteName: String,
                siteUrl: String
            }
        ],
        location: String,
        contact: String,
        postedReviews: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Review',
            }
        ],
    },
    { timestamps: true });

    const Band = mongoose.model('Band', BandSchema);

    return Band;
}