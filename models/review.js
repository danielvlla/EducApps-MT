var mongoose = require("mongoose");

// Review Schema
var ReviewSchema = new mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String,
    },
    rating: {
        design: Number,
        effectiveness: Number,
        usability: Number,
        content: Number,
        total: Number
    },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        name: String
    },
    created: {
        type: Date,
        default: Date.now
    },
    isAnonymous: {
        type: Boolean,
        default: false
    }
});

// Create MODEL from schema which contains mongoose methods
var Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;