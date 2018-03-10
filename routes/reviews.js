var express     = require("express");
var router      = express.Router({mergeParams: true});
var Application = require("../models/application");
var Review      = require("../models/review");

// ================================
// REVIEW ROUTES
// ================================

// Submit Review ie. Create Review
router.post("", function(req, res){
    // Look up application
    Application.findById(req.params.id, function(err, application){
        if (err) {
            console.log(err);
            res.redirect("/applications");
        } else {
            // Create New Review
            Review.create(req.body.review, function(err, review){
                if (err){
                    console.log(err);
                } else {
                    // Add Username and ID to review
                    review.author.id = req.user._id;
                    review.author.username = req.user.username;
                    review.save();
                    // Connect New Review to Application
                    application.reviews.push(review._id);
                    application.save();
                    // Redirect Campground Show Page
                    res.redirect("/applications/" + application._id);
                }
            });
        }
    });
});

// COMMENT UPDATE ROUTE
router.put("/:review_id", function(req, res){
    Review.findByIdAndUpdate(req.params.review_id, req.body.review, function(err, updatedReview){
        if (err) {
            res.redirect("back");
        } else {
            res.redirect("/applications/" + req.params.id);
        }
    });
});

// COMMENT DESTROY ROUTE
router.delete("/:review_id", function(req, res){
    Review.findByIdAndRemove(req.params.review_id, function(err){
        if (err){
            res.redirect("back");
        } else {
            res.redirect("/applications/" + req.params.id);
        }
    });
});

module.exports = router;