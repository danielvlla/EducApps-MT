var express       = require("express"),
    app           = express();

app.set("view engine", "ejs");

// ROUTES
var indexRoutes   = require("./routes/index");
app.use("/", indexRoutes);

app.listen(3000, function(){
    console.log("App is running");
})
