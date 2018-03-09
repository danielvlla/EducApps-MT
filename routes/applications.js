var express     = require("express");
var router      = express.Router();
var Application = require("../models/application");

// ================================
// APPLICATION ROUTES
// ================================

// INDEX ROUTE - Show All Applications
router.get("/", function(req, res){
    Application.find({}, function(err, allApplications){
        if (err) {
            console.log(err);
        } else {
            res.render("applications/index");
        }
    });
});

// CREATE ROUTE - Add New Review
router.post("/", function(req, res) {
    var url = req.body.appUrl;

    var newApplication = {url: url};

    Application.create(newApplication, function(err, newlyCreated){
        if (err) {
            console.log(err);
        } else {
            res.redirect("/applications");
        }
    });
});

// NEW ROUTE - Show form to create new campground
router.get("/new", function(req, res) {
    res.render("applications/new");
});

module.exports = router;
