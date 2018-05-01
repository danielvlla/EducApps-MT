var express     = require("express");
var router      = express.Router();
var passport    = require("passport");
var User        = require("../models/user");

// ================================
// GENERIC ROUTES
// ================================

// Root Route
router.get("/", function(req, res){
    res.render("landing");
});

// ================================
// AUTHENTICATION ROUTES
// ================================

// HANDLE SIGN UP LOGIC
router.post("/register", function(req, res){
    var newUser = new User({
        username: req.body.email,
        email: req.body.email
    });
    User.register(newUser, req.body.password, function(err, user){

        if(err){
            console.log(err.message);
            return res.redirect("/");
        }

        passport.authenticate("local")(req, res, function(){
            res.redirect("/applications");
        });
    });
});

// HANDLE LOGIN LOGIC
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/applications",
        failureRedirect: "/login"
    }), function(req, res){
});

// LOGOUT ROUTE
router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/applications");
});

module.exports = router;