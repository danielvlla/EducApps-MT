var express       = require("express"),
    app           = express();

// ROUTES
var indexRoutes   = require("./routes/index");

app.set("view engine", "ejs");

// ROUTES
app.use("/", indexRoutes);

app.listen(3000, function(){
    console.log("App is running");
})
