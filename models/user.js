var mongoose  = require("mongoose");
var passportLocalMongoose   = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    name: {
        firstName:
            {
                type: String,
            },
        lastName:
            {
                type: String,
            }
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    role: {
        type: String,
        enum: ["Teacher", "Parent"]
    },
    school: {
        type: String,
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

UserSchema.plugin(passportLocalMongoose);

// Create MODEL from schema which contains mongoose methods
var User = mongoose.model("User", UserSchema);

module.exports = User;