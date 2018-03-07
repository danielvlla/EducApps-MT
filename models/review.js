var mongoose = require("mongoose");

// Review Schema
var reviewSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    reviewedAt: {
        type: Date,
        default: Date.now
    }
});

// Create MODEL from schema which contains mongoose methods
var Review = mongoose.model("App", reviewSchema);

module.exports = Review;