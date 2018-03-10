var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    mongoose        = require("mongoose"),
    Application     = require("./models/application"),
    Review          = require("./models/review"),
    User            = require("./models/user");

// DATABASE
// mongoose.connect("mongodb://localhost/educappmt");
mongoose.connect("mongodb://daniel:danielpassword@ds261138.mlab.com:61138/educappsmt");

app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(express.static(__dirname + '/public'));
app.set("view engine", "ejs");
app.locals.moment   = require("moment");

// PASSPORT CONFIG
app.use(require("express-session")({
    secret: "This is a GAPT",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser);
passport.deserializeUser(User.deserializeUser);
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

// ROUTES
var indexRoutes         = require("./routes/index");
var applicationRoutes   = require("./routes/applications");
var reviewRoutes        = require("./routes/reviews");

app.use("/", indexRoutes);
app.use("/applications", applicationRoutes);
app.use("/applications/:id/reviews/", reviewRoutes);

app.listen(3000, function(){
    console.log("App is running");
});