var express         = require("express");
var router          = express.Router();
var Application     = require("../models/application");
var rp              = require('request-promise');
var cheerio         = require('cheerio');
var middleware      = require("../middleware");
var ensureLoggedIn  = require("connect-ensure-login").ensureLoggedIn;
var validator       = require("validator");

// ================================
// APPLICATION ROUTES
// ================================

// INDEX ROUTE - Show All Applications
router.get("/", function(req, res){
    Application.find({}).populate("reviews").exec(function(err, allApplications){
        if (err) {
            console.log(err);
        } else {
            if(req.user && req.user.isAdmin) {
                res.render("applications/indexAdmin.ejs", {applications: allApplications});
            } else {
                res.render("applications/index.ejs", {applications: allApplications});
            }
        }
    });
});

router.get("/category/:category", function(req, res){
    var cat = req.params.category.charAt(0).toUpperCase() + req.params.category.slice(1);
    Application.find({ "category": cat } , function(err, allApplications){
        if (err) {
            console.log(err);
        } else {
            res.render("applications/index.ejs", {applications: allApplications});
        }
    });
});

// NEW ROUTE - Show form to create new application
router.get("/new", ensureLoggedIn("/login"), function(req, res) {
    res.render("applications/new");
});

// CREATE ROUTE - Add New Application
router.post("/", ensureLoggedIn("/login"), function(req, res) {

    validator.isEmpty(req.body.appUrl);

    var url = req.body.appUrl;

    const options = {
        uri: url,
        transform: function (body) {
            try {
                return cheerio.load(body)
            } catch (e) {
                req.flash("error", "Application Data not loaded. Did you paste in the correct URL?");
                res.redirect("/applications/new");
            }
        }
    };

    rp(options)
        .then(($) => {
            var appTitle = $('.AHFaub').find('span').text();
            var appDescription = $('.DWPxHb').find('content').find('div').text();
            var appImageUrl = $('.dQrBL').find('img').attr('src').toString();
            var playRating = $('.BHMmbe').text();
            var author = {
                id: req.user._id,
                username: req.user.email
            };
            var category = req.body.category;

            validator.isEmpty(url);
            validator.isEmpty(appTitle);
            validator.isEmpty(appDescription);
            validator.isEmpty(appImageUrl);
            validator.isEmpty(playRating);

            playRating = Number(playRating);
            playRating = Math.round(playRating);

            Application.findOne({name: appTitle}, function(err, existingApp){
                if (existingApp == null){
                    var newApplication = {
                        url: url,
                        name: appTitle,
                        description: appDescription,
                        thumbnail: appImageUrl,
                        rating: {
                            playStore: playRating,
                            users: 0
                        },
                        author: author,
                        category: category
                    };

                    Application.create(newApplication, function(err, newlyCreated){
                        if (err) {
                            req.flash("error", "Application not submitted. Did you paste in the correct URL?");
                            res.redirect("/applications/new");
                        } else {
                            req.flash("success", "Successfully submitted Educational App");
                            res.redirect("/applications");
                        }
                    });
                } else {
                    req.flash("error", "App already exists, here you go!");
                    res.redirect("/applications/" + existingApp._id);
                }
            });
        })
        .catch((err) => {
            req.flash("error", "Did you paste in the correct URL?");
            res.redirect("/applications/new");
        });
});

// SHOW ROUTE - Show an Application
router.get("/:id", function(req, res){
    Application.findById(req.params.id).populate("reviews").exec(function(err, foundApplication){
        if (err || !foundApplication) {
            console.log(err);
            req.flash("error", "App not found!");
            res.redirect("back");
        } else {
            res.render("applications/show", {application: foundApplication});
        }
    });
});

// EDIT ROUTE
router.get("/:id/edit", middleware.checkIfAdmin, function(req, res){
    Application.findById(req.params.id, function(err, foundApplication){
        res.render("applications/edit", {application: foundApplication});
    });
});

// UPDATE ROUTE
router.put("/:id", middleware.checkIfAdmin, function(req, res){
    Application.findByIdAndUpdate(req.params.id, req.body.application, function(err, updatedApplication){
        if(err){
            res.redirect("/applications");
        } else {
            res.redirect("/applications/" + req.params.id);
        }
    });
});

// DESTROY ROUTE
router.delete("/:id", middleware.checkIfAdmin, function(req, res){
    Application.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/applications");
        } else {
            res.redirect("/applications");
        }
    });
});
    
module.exports = router;