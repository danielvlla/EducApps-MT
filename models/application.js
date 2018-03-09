var mongoose = require("mongoose");

// Review Schema
var applicationSchema = new mongoose.Schema({
    url: String
});

// Create MODEL from schema which contains mongoose methods
var Application = mongoose.model("Application", applicationSchema);

module.exports = Application;