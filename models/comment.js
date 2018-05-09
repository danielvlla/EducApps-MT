var mongoose = require("mongoose");

// Comment Schema
var CommentSchema = new mongoose.Schema({
    description: {
        type: String,
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
    }
});

var Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;