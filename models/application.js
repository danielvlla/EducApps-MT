var mongoose = require("mongoose");

// Application Schema
var applicationSchema = new mongoose.Schema({
    url: {
        type: String,
        // required: true
    },
    name: {
        type: String,
        // required: true
    },
    description: {
        type: String,
        // required: true
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
var Application = mongoose.model("Application", applicationSchema);

module.exports = Application;