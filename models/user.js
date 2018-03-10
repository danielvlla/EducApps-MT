var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

// Review Schema
var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    isParent: {type: Boolean, default: false},
    isTeacher: {type: Boolean, default: false},
    year: {type: Number, default: 0},
    isVerified: {type: Boolean, default: false},
    isAdmin: {type: Boolean, default: false}
});

userSchema.plugin(passportLocalMongoose);

// Create MODEL from schema which contains mongoose methods
var User = mongoose.model("User", userSchema);

module.exports = User;