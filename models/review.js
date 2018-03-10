var mongoose = require("mongoose");

// Review Schema
var reviewSchema = new mongoose.Schema({
    author: String,
    stars: Number,
    reviewTitle: String,
    reviewText: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    reviewedAt: {
        type: Date,
        default: Date.now
    }
});

// Create MODEL from schema which contains mongoose methods
var Review = mongoose.model("Review", reviewSchema);

module.exports = Review;