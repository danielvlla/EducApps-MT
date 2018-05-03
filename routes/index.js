var express     = require("express");
var router      = express.Router();
var passport    = require("passport");
var User        = require("../models/user");
var middleware  = require("../middleware");

// ================================
// GENERIC ROUTES
// ================================

// Root Route
router.get("/", function(req, res){
    res.render("landing");
});

router.get("/profile", middleware.isLoggedIn, function(req, res){
    console.log(req.user);
    res.render("profile", {user: req.user});
});

// ================================
// AUTHENTICATION ROUTES
// ================================

router.post("/register", function(req, res){

    var newUser = new User({
        username: req.body.email,
        email: req.body.email,
        name: {
            firstName: req.body.firstname.charAt(0).toUpperCase() + req.body.firstname.slice(1),
            lastName: req.body.lastname
        },
        role: req.body.role
    });

    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            req.flash("error", err.message);
            return res.redirect("/");
        }
        passport.authenticate("local")(req, res, function(){
            console.log("Registered to EducAppsMT " + user.username);
            req.flash("success", "Successfully registered and logged in!");
            res.redirect("/applications");
        });
    });
});

router.get("/login", function(req, res){
    res.render("login");
});

router.post("/login",
    passport.authenticate("local", { failureRedirect: "/", failureFlash: true }),
    function(req, res) {
        req.flash("success", "Logged you in!");
        res.redirect("/applications");
});

router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/");
});

module.exports = router;