var express     = require("express");
var router      = express.Router();
var Application = require("../models/application");
var gplay       = require('google-play-scraper');

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

// CREATE ROUTE - Add New Application
router.post("/", function(req, res) {

    var url = req.body.appUrl;

    var app_id = url.substring(url.indexOf("details?id=")+11);

    // var gplay = require('google-play-scraper');

    gplay.app({appId: 'com.dxco.pandavszombies'})
        .then(console.log, console.log);

    var newApplication = {name: app_id};

    Application.create(newApplication, function(err, newlyCreated){
        if (err) {
            console.log(err);
        } else {
            res.redirect("/applications");
        }
    });
});

// NEW ROUTE - Show form to create new application
router.get("/new", function(req, res) {
    res.render("applications/new"); 
});

// SHOW ROUTE - Show an Application
router.get("/:id", function(req, res){
    Application.findById(req.params.id, function(err, foundApplication){
        // found campground can return null if the id is valid but it doesnt exist
        if (err || !foundApplication) {
            console.log(err);
            res.redirect("back");
        } else {
            console.log(foundApplication);
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
