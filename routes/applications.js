var express     = require("express");
var router      = express.Router();
var Application = require("../models/application");
var rp          = require('request-promise');
var cheerio     = require('cheerio');
var middleware  = require("../middleware");

// ================================
// APPLICATION ROUTES
// ================================

// INDEX ROUTE - Show All Applications
router.get("/", function(req, res){
    Application.find({}, function(err, allApplications){
        if (err) {
            console.log(err);
        } else {
            res.render("applications/index", {applications: allApplications});
        }
    });
});

// NEW ROUTE - Show form to create new application
router.get("/new", middleware.isLoggedIn, function(req, res) {
    Application.category
    res.render("applications/new");
});

// CREATE ROUTE - Add New Application
router.post("/", middleware.isLoggedIn, function(req, res) {

    var url = req.body.appUrl;

    const options = {
        uri: url,
        transform: function (body) {
            return cheerio.load(body);
        }
    };

    rp(options)
        .then(($) => {
            var appTitle = $('.AHFaub').find('span').text();
            var appDescription = $('.DWPxHb').find('content').find('div').text();
            var appImageUrl = $('.dQrBL').find('img').attr('src').toString();
            var playStoreRating = $('.BHMmbe').text();

            var newApplication = {url: url, name: appTitle, description: appDescription, thumbnail: appImageUrl, playStore: playStoreRating};

            Application.create(newApplication, function(err, newlyCreated){
                if (err) {
                    res.redirect("/applications/new");
                    console.log(err);
                } else {
                    res.redirect("/applications");
                }
            });
        })
        .catch((err) => {
            res.redirect("/applications/new");
            console.log(err);
        });
});

// SHOW ROUTE - Show an Application
router.get("/:id", function(req, res){
    Application.findById(req.params.id).populate("reviews").exec(function(err, foundApplication){

        if (err || !foundApplication) {
            console.log(err);
            res.redirect("back");
        } else {
            res.render("applications/show", {application: foundApplication});
        }
    });
});

// EDIT ROUTE
router.get("/:id/edit", function(req, res){
    Application.findById(req.params.id, function(err, foundApplication){
        res.render("applications/edit", {application: foundApplication});
    });
});

// UPDATE ROUTE
router.put("/:id", function(req, res){
    Application.findByIdAndUpdate(req.params.id, req.body.application, function(err, updatedApplication){
        if(err){
            res.redirect("/applications");
        } else {
            res.redirect("/applications/" + req.params.id);
        }
    });
});

// DESTROY ROUTE
router.delete("/:id", function(req, res){
    Application.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/applications");
        } else {
            res.redirect("/applications");
        }
    });
});
    
module.exports = router;
