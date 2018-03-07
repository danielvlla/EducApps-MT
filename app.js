var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose");

app.locals.moment = require("moment");

mongoose.connect("mongodb://localhost/educappmt");

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// Review.create({
//     name: "Mindmap",
//     image: "http://www.mindtools.com/media/Diagrams/mindmap.jpg"
// }, function(err, review){
//     if(err){
//         console.log(err);
//     } else {
//         console.log("created review");
//         console.log(review);
//     }
// });

// ROUTES
var indexRoutes   = require("./routes/index");
app.use("/", indexRoutes);

app.listen(3000, function(){
    console.log("App is running");
});
