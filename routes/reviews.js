var express     = require("express");
var router      = express.Router({mergeParams: true});
var Application = require("../models/application");
var Review      = require("../models/review");
var middleware  = require("../middleware");

// ================================
// REVIEW ROUTES
// ================================

// Submit Review ie. Create Review
router.post("", middleware.isLoggedIn, function(req, res){
    // Look up application
    Application.findById(req.params.id, function(err, application){
        if (err) {
            req.flash("error", "App not found");
            res.redirect("/applications");
        } else {

            var rating = [req.body.design, req.body.effectiveness, req.body.usability, req.body.content];

            var sum = 0;
            for( var i = 0; i < rating.length; i++ ){
                sum += parseInt(rating[i], 10);
            }

            var avg = sum/rating.length;

            // Create New Review
            var newReview = {
                title: req.body.title,
                description: req.body.description,
                rating: {
                    design: req.body.design,
                    effectiveness: req.body.effectiveness,
                    usability: req.body.usability,
                    content: req.body.content,
                    total: avg
                }
            };

            Review.create(newReview, function(err, review){
                if (err){
                    req.flash("error", "Review could not be submitted");
                } else {
                    review.save();
                    application.reviews.push(review._id);
                    application.save();
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