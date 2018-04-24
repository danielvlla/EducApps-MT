var mongoose = require("mongoose");

// Review Schema
var reviewSchema = new mongoose.Schema({
    author: {
        type: String,
        // required: true
    },
    rating: {
        design: Number,
        effectiveness: Number,
        usability: Number,
        content: Number,
        total: Number
    },
    title: {
        type: String
    },
    description: {
        type: String,
        // required: true
    },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    created: {
        type: Date,
        default: Date.now
    }
});

// Create MODEL from schema which contains mongoose methods
var Review = mongoose.model("Review", reviewSchema);

module.exports = Review;