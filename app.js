var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    flash           = require("connect-flash"),
    session         = require("express-session"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    cookieParser    = require("cookie-parser"),
    LocalStrategy   = require("passport-local").Strategy,
    methodOverride  = require("method-override");

// MODELS
var Application     = require("./models/application"),
    Review          = require("./models/review"),
    User            = require("./models/user");

// ROUTES
var indexRoutes         = require("./routes/index"),
    applicationRoutes   = require("./routes/applications"),
    reviewRoutes        = require("./routes/reviews");

mongoose.connect("mongodb://daniel:danielpassword@ds261138.mlab.com:61138/educappsmt");

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(cookieParser("secret"));
app.use(express.static(__dirname + "/public"));
app.locals.moment = require("moment");
app.use(flash());
app.use(session({
    secret: "CIS GAPT",
    resave: false,
    saveUninitialized: false,
}));

// Passport CONFIG
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({
    usernameField: "email",
    passwordField: "password"
}, User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

app.use("/", indexRoutes);
app.use("/applications", applicationRoutes);
app.use("/applications/:id/reviews/", reviewRoutes);

app.listen(3000, function(){
    console.log("EducAppsMT is running on port 3000");
});