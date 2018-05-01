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
            firstName: req.body.firstname,
            lastName: req.body.lastname
        }
    });

    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            req.flash("error", err.message);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function(){
            console.log("Registered to EducAppsMT " + user.username);
            res.redirect("/applications");
        });
    });
});

router.post("/login",
    passport.authenticate("local", { failureRedirect: "/login" }),
    function(req, res) {
        res.redirect("/applications");
});

router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
});

module.exports = router;