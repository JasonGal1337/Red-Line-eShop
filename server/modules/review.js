const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    product: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: false,
    },
    comment: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
    }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;