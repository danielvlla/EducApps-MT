var mongoose = require("mongoose");

// Review Schema
var applicationSchema = new mongoose.Schema({
    url: String,
    name: String,
    description: String,
    thumbnail: String,
    topic: String,
    stars: Number,
    images: [String],
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