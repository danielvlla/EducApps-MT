var passport        = require("passport"),
    LocalStrategy   = require("passport-local").Strategy;

var User            = require("../models/user");

passport.serializeUser(function(user, done){
    // save user id in session
    done(null, user.id);
});

passport.deserializeUser(function(id, done){
   // fetch based on user id
   User.findById(id, function(err, user){
       done(err, user);
   });
});

passport.use("local.register", new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
}, function(req, email, password, done){

    User.findOne({"email": email}, function(err, user){
       if(err){
           return done(err);
       }

       if(user){
           return done(null, false);
       }

       var newUser = new User();
       newUser.name.firstName = req.body.firstname;
       newUser.name.lastName = req.body.lastname;
       newUser.email = req.body.email;
       newUser.password = newUser.encryptPassword(req.body.password);

       newUser.save(function(err){
         if(err){
             return done(err);
         }

         return done(null, newUser);
       });
    });
}));

passport.use("local.login", new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
}, function(req, email, password, done){

    User.findOne({"email": email}, function(err, user){
        if(err){
            return done(err);
        }

        if(!user){
            req.flash("loginError", "User data not found!");
            return done(null, false);
        }

        if(!user.validPassword(req.body.password)){
           return done(null, false);
        }

        return done(null, user);
    });
}));