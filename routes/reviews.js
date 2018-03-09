// var express     = require("express");
// var router      = express.Router();
// var Review      = require("../models/review");

// // ================================
// // REVIEW ROUTES
// // ================================

// // INDEX ROUTE - Show All Reviews
// router.get("/", function(req, res){
//     Review.find({}, function(err, allReviews){
//         if (err) {
//             console.log(err);
//         } else {
//             res.render("reviews/index");
//         }
//     });
// });

// // CREATE ROUTE - Add New Review
// router.post("/", function(req, res) {
//     var 
// });


// // CREATE ROUTE - Add new campground
// router.post("/", middleware.isLoggedIn, function(req, res) {
//     // Get Data From Form
//     var name = req.body.name;
//     var price = req.body.price;
//     var image = req.body.image;
//     var desc = req.body.description; // what the name attribute in the form is set to
//     var author = {
//         id: req.user._id,
//         username: req.user.username
//     };
//     // Create Campground object
//     var newCampground = {name: name, price: price, image: image, description: desc, author: author};

//     // Create a new campground and save to DB
//     Campground.create(newCampground, function(err, newlyCreated){
//         if(err) {
//             console.log(err);
//         } else {
//             // Redirect to campgrounds page
//             res.redirect("/campgrounds");
//         }
//     });
// });

// // NEW ROUTE - Show form to create new campground
// router.get("/new", function(req, res) {
//     res.render("reviews/new");
// });

// module.exports = router;
