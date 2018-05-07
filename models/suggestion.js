var mongoose = require("mongoose");

// Application Schema
var SuggestionSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    category: [{
        type: String,
        enum: ["General", "Maths", "English", "Maltese", "Religion", "Social Studies"]
    }],
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    created: {
        type: Date,
        default: Date.now
    }
});

var Suggestion = mongoose.model("Suggestion", SuggestionSchema);

module.exports = Suggestion;