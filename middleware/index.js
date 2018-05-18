var Application = require("../models/application"),
    User        = require("../models/user"),
    Comment     = require("../models/comment"),
    Suggestion  = require("../models/suggestion"),
    Review      = require("../models/review");

var middlewareObj = {};

middlewareObj.checkReviewOwnership = function(req, res, next){
    // Is user logged in?
    if (req.isAuthenticated()){
        Review.findById(req.params.review_id, function(err, foundReview){
            if (err || !foundReview){
                req.flash("error", "Review not found");
                res.redirect("back");
            } else {
                // Does user own the comment
                // first one is a mongoose object and the req.user._id
                // is a string so you cant compare with ===
                if (foundReview.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in");
        res.redirect("back");
    }
};

middlewareObj.checkSuggestionOwnership = function(req, res, next){
    if (req.isAuthenticated()){
        Suggestion.findById(req.params.suggestion_id, function(err, foundSuggestion){
            if (err || !foundSuggestion){
                req.flash("error", "Suggestion not found");
                res.redirect("back");
            } else {
                if (foundSuggestion.author.id.equals(req.user._id) || req.user.isAdmin) {
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in");
        res.redirect("back");
    }
};

middlewareObj.checkCommentOwnership = function(req, res, next){
    // Is user logged in?
    if (req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if (err || !foundComment){
                req.flash("error", "Suggestion not found");
                res.redirect("back");
            } else {
                if (foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in");
        res.redirect("back");
    }
};

middlewareObj.checkIfAdmin = function(req, res, next){
    // Is user logged in?
    if (req.isAuthenticated()){
        User.findById(req.user._id, function(err, foundUser){
            if (err || !foundUser){
                req.flash("error", "Not Found");
                res.redirect("back");
            } else {
                if (foundUser.isAdmin) {
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else {
        // back to where they came from
        req.flash("error", "You need to be logged in");
        res.redirect("back");
    }
};

module.exports = middlewareObj;