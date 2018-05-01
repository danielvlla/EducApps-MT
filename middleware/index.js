var Application = require("../models/application"),
    Review      = require("../models/review");

var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    // Flash msg shows up on the FOLLOWING page (ie. login)
    console.log("You need to be logged in to do that");
    res.redirect("/");
};

module.exports = middlewareObj;