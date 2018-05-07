var express     = require("express");
var router      = express.Router();
var Suggestion  = require("../models/suggestion");
var middleware  = require("../middleware");
var validator   = require("validator");

// ================================
// APPLICATION ROUTES
// ================================

// INDEX ROUTE - Show All Suggestions
router.get("/", function(req, res){
    Suggestion.find({}, function(err, allSuggestions){
        if (err) {
            console.log(err);
        } else {
            res.render("suggestions/index", {suggestions: allSuggestions});
        }
    });
});

// NEW ROUTE - Show form to create new application
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("suggestions/new");
});

// CREATE ROUTE - Add New Application
router.post("/", middleware.isLoggedIn, function(req, res) {

    Suggestion.create(newSuggestion, function(err, newlyCreated) {
        if (err) {
            req.flash("error", "Suggestion not submitted. Something went wrong");
            res.redirect("/suggestions/new");
        } else {
            req.flash("success", "Successfully submitted your Suggestion");
            res.redirect("/suggestions");
        }
    });
});

// SHOW ROUTE - Show an Application
router.get("/:id", function(req, res){
    Suggestion.findById(req.params.id).populate("comments").exec(function(err, foundSuggestion){
        if (err || !foundSuggestion) {
            console.log(err);
            req.flash("error", "Suggestion not found!");
            res.redirect("back");
        } else {
            res.render("suggestions/show", {suggestion: foundSuggestion});
        }
    });
});

// EDIT ROUTE
router.get("/:id/edit", middleware.isLoggedIn, function(req, res){
    Suggestion.findById(req.params.id, function(err, foundSuggestion){
        res.render("suggestions/edit", {suggestion: foundSuggestion});
    });
});

// UPDATE ROUTE
router.put("/:id", middleware.isLoggedIn, function(req, res){
    Suggestion.findByIdAndUpdate(req.params.id, req.body.suggestion, function(err, updatedSuggestion){
        if(err){
            res.redirect("/suggestions");
        } else {
            res.redirect("/suggestions/" + req.params.id);
        }
    });
});

// DESTROY ROUTE
router.delete("/:id", middleware.isLoggedIn, function(req, res){
    Suggestion.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/suggestions");
        } else {
            res.redirect("/suggestions");
        }
    });
});

module.exports = router;