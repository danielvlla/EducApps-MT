var express         = require("express");
var router          = express.Router();
var passport        = require("passport");
var User            = require("../models/user");
var middleware      = require("../middleware");
var ensureLoggedIn  = require("connect-ensure-login").ensureLoggedIn;
var validator       = require("validator");

// ================================
// GENERIC ROUTES
// ================================

// Root Route
router.get("/", function(req, res){
    res.render("landing");
});

router.get("/profile", ensureLoggedIn("/login"), function(req, res){
    res.render("profile", {user: req.user});
});

// ================================
// AUTHENTICATION ROUTES
// ================================

router.post("/register", function(req, res){

    validator.isEmail(req.body.email);
    validator.isEmpty(req.body.email);
    validator.isEmpty(req.body.firstname);
    validator.isEmpty(req.body.lastname);
    validator.isEmpty(req.body.password);
    validator.trim(req.body.email);
    validator.trim(req.body.firstname);
    validator.trim(req.body.lastname);

    var newUser = new User({
        username: req.body.email,
        email: req.body.email,
        name: {
            firstName: req.body.firstname.charAt(0).toUpperCase() + req.body.firstname.slice(1),
            lastName: req.body.lastname.charAt(0).toUpperCase() + req.body.lastname.slice(1)
        },
        role: req.body.role,
        school: req.body.school
    });

    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.redirect("/");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Successfully registered and logged in!");
            res.redirect("/applications");
        });
    });
});

router.get("/login", function(req, res){
    res.render("login");
});

router.post("/login",
    passport.authenticate("local", { successReturnToOrRedirect: "/", failureRedirect: "/login", failureFlash: true }),
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