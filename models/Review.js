//*** Review Model ***//
//====================//
module.exports = (mongoose, Schema) => {
    const ReviewSchema = new Schema({
        venue: String,
        author: String,
        rating: { 
            type: Number, 
            required: true, 
            min: 0, 
            max: 5 
        },
        reviewText: String,
    },
    { timestamps: true });

    const Review = mongoose.model('Review', ReviewSchema);

    return Review
}