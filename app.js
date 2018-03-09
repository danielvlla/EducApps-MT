var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose");

app.locals.moment = require("moment");

mongoose.connect("mongodb://localhost/educappmt");

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// ROUTES
var indexRoutes   = require("./routes/index");
var applicationRoutes  = require("./routes/applications");

app.use("/", indexRoutes);
app.use("/applications", applicationRoutes);

app.listen(3000, function(){
    console.log("App is running");
});
