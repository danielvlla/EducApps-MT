var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

// User Schema
var userSchema = new mongoose.Schema({
    email: {
      type: String,
      // required: true,
      unique: true
    },
    password: {
        type: String,
        // required: true
    },
    name: {
        firstName:
            {
                type: String,
                // required: true
            },
        lastName:
            {
                type: String,
                // required: true
            }
    },
    role: {
        type: String,
        enum: ["teacher", "parent"]
    },
    created: {
        type: Date,
        default: Date.now
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

userSchema.plugin(passportLocalMongoose);

// Create MODEL from schema which contains mongoose methods
var User = mongoose.model("User", userSchema);

module.exports = User;