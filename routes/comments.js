var express         = require("express");
var router          = express.Router({mergeParams: true});
var Suggestion      = require("../models/suggestion");
var Comment         = require("../models/comment");
var middleware      = require("../middleware");
var ensureLoggedIn  = require("connect-ensure-login").ensureLoggedIn;
var validator       = require("validator");

// ================================
// Comment ROUTES
// ================================

// Submit Comment
router.post("", ensureLoggedIn("/login"), function(req, res){
    // Look up application
    Suggestion.findById(req.params.id, function(err, suggestion){
        if (err) {
            req.flash("error", "Suggestion not found");
            res.redirect("/applications");
        } else {
            validator.isEmpty(req.body.description);

            // Create New Comment
            var newComment = {
                description: req.body.description.charAt(0).toUpperCase() + req.body.description.slice(1),
                author: {
                    id: req.user._id,
                    name: req.user.name.firstName + " " + req.user.name.lastName
                },
            };

            Comment.create(newComment, function(err, comment){
                if (err){
                    req.flash("error", "Comment could not be submitted");
                } else {
                    comment.save();
                    suggestion.comments.push(comment._id);
                    suggestion.save();
                    res.redirect("/suggestions/" + suggestion._id);
                }
            });
        }
    });
});

// COMMENT DESTROY ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if (err){
            res.redirect("back");
        } else {
            res.redirect("/suggestions/" + req.params.id);
        }
    });
});

module.exports = router;