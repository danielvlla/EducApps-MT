var express     = require("express");
var router      = express.Router({mergeParams: true});
var Application = require("../models/application");
var Review      = require("../models/review");
var middleware  = require("../middleware");
var ensureLoggedIn  = require("connect-ensure-login").ensureLoggedIn;
var validator   = require("validator");

// ================================
// REVIEW ROUTES
// ================================

// Submit Review ie. Create Review
router.post("", ensureLoggedIn("/login"), function(req, res){
    // Look up application
    Application.findById(req.params.id, function(err, application){
        if (err) {
            req.flash("error", "Application not found");
            res.redirect("/applications");
        } else {
            validator.isEmpty(req.body.title);
            validator.isEmpty(req.body.description);

            var rating = [req.body.design, req.body.effectiveness, req.body.usability, req.body.content];

            var sum = 0;
            for( var i = 0; i < rating.length; i++ ){
                sum += parseInt(rating[i], 10);
            }

            var avg = sum/rating.length;

            req.body.anon = req.body.anon.map(item => (Array.isArray(item) && item[1]) || "false");

            // Create New Review
            var newReview = {
                title: req.body.title.charAt(0).toUpperCase() + req.body.title.slice(1),
                description: req.body.description.charAt(0).toUpperCase() + req.body.description.slice(1),
                rating: {
                    design: req.body.design,
                    effectiveness: req.body.effectiveness,
                    usability: req.body.usability,
                    content: req.body.content,
                    total: avg
                },
                author: {
                    id: req.user._id,
                    name: req.user.name.firstName + " " + req.user.name.lastName
                },
                isAnonymous: req.body.anon[0]
            };

            Review.create(newReview, function(err, review){
                if (err){
                    req.flash("error", "Review could not be submitted");
                } else {
                    var numOfReviews = application.reviews.length;
                    var usersRating = application.rating.users;

                    if (numOfReviews == 0) {
                        application.rating.users = review.rating.total;
                    } else {
                        application.rating.users = usersRating + ((review.rating.total - usersRating) / (numOfReviews+1));
                    }

                    review.save();
                    application.reviews.push(review._id);
                    application.save();
                    res.redirect("/applications/" + application._id);
                }
            });
        }
    });
});

// REVIEW UPDATE ROUTE
router.put("/:review_id", middleware.checkReviewOwnership, function(req, res){
    Review.findByIdAndUpdate(req.params.review_id, req.body.review, function(err, updatedReview){
        if (err) {
            res.redirect("back");
        } else {
            res.redirect("/applications/" + req.params.id);
        }
    });
});

// REVIEW DESTROY ROUTE
router.delete("/:review_id", middleware.checkReviewOwnership, function(req, res) {
    Application.findById(req.params.id, function (err, application) {
        if (err) {
            req.flash("error", "Application not found");
            res.redirect("/applications");
        } else {
            Review.findById(req.params.review_id, function(err, review){
                if (err) {
                    req.flash("error", "Something went wrong");
                    res.redirect("back");
                } else {
                    var numOfReviews = application.reviews.length;
                    var usersAvgRating = application.rating.users;
                    var reviewToBeDeletedRating = review.rating.total;

                    if (numOfReviews === 1) {
                        application.rating.users = 0;
                    } else {
                        application.rating.users = ((usersAvgRating * numOfReviews)-reviewToBeDeletedRating) / (numOfReviews-1);
                    }

                    application.reviews.remove(review._id);

                    application.save();
                    res.redirect("/applications/" + req.params.id);
                }
            });
        }
    });
});

module.exports = router;