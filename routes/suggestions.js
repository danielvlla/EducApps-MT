var express         = require("express");
var router          = express.Router();
var Suggestion      = require("../models/suggestion");
var middleware      = require("../middleware");
var ensureLoggedIn  = require("connect-ensure-login").ensureLoggedIn;
var validator       = require("validator");

// ================================
// SUGGESTION ROUTES
// ================================

// INDEX ROUTE - Show All Suggestions
router.get("/", function(req, res){
    Suggestion.find({}).populate("comments").exec(function(err, allSuggestions){
        if (err) {
            console.log(err);
        } else {
            if(req.user && req.user.isAdmin) {
                res.render("suggestions/indexAdmin", {suggestions: allSuggestions});
            } else {
                res.render("suggestions/index", {suggestions: allSuggestions});
            }
        }
    });
});

router.get("/category/:category", function(req, res){
    var cat = req.params.category.charAt(0).toUpperCase() + req.params.category.slice(1);
    Suggestion.find({ "category": cat } , function(err, allSuggestions){
        if (err) {
            console.log(err);
        } else {
            res.render("suggestions/index.ejs", {suggestions: allSuggestions});
        }
    });
});

// NEW ROUTE - Show form to create new suggestion
router.get("/new", ensureLoggedIn("/login"), function(req, res) {
    res.render("suggestions/new");
});

// CREATE ROUTE - Add New suggestion
router.post("/", ensureLoggedIn("/login"), function(req, res) {

    validator.isEmpty(req.body.suggestionTitle);
    var author = {
        id: req.user._id,
        username: req.user.email
    };
    var title = req.body.suggestionTitle.charAt(0).toUpperCase() + req.body.suggestionTitle.slice(1);

    var newSuggestion = new Suggestion({
        name: title,
        category: req.body.category,
        description: req.body.suggestionDescription,
        author: author
    });

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

// SHOW ROUTE - Show a suggestion
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
router.get("/:id/edit", middleware.checkSuggestionOwnership, function(req, res){
    Suggestion.findById(req.params.id, function(err, foundSuggestion){
        res.render("suggestions/edit", {suggestion: foundSuggestion});
    });
});

// UPDATE ROUTE
router.put("/:id", middleware.checkSuggestionOwnership, function(req, res){
    Suggestion.findByIdAndUpdate(req.params.id, req.body.suggestion, function(err, updatedSuggestion){
        if(err){
            res.redirect("/suggestions");
        } else {
            res.redirect("/suggestions/" + req.params.id);
        }
    });
});

// DESTROY ROUTE
router.delete("/:id", middleware.checkSuggestionOwnership, function(req, res){
    Suggestion.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/suggestions");
        } else {
            res.redirect("/suggestions");
        }
    });
});

module.exports = router;