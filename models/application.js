var mongoose = require("mongoose");

// Application Schema
var ApplicationSchema = new mongoose.Schema({
    url: {
        type: String,
    },
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    thumbnail: String,
    category: [{
        type: String,
        enum: ["general", "maths", "english", "maltese", "religion"]
    }],
    rating: {
        playStore: Number,
        users: Number
    },
    created: {
        type: Date,
        default: Date.now
    },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review"
        }
    ]   
});

// Create MODEL from schema which contains mongoose methods
var Application = mongoose.model("Application", ApplicationSchema);

module.exports = Application;