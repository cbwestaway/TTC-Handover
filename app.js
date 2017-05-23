var express = require("express");
var app = express();
var request = require("request");

app.use(express.static(__dirname + '/public'));
app.set("view engine", "ejs");


var staff = {staffPage: false};
// Home Page
app.get("/", function(req, res){
    

    request("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22toronto%2C%20on%22)%20and%20u%3D%22c%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys",
    function (error, response, body) {
      console.log('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    
    var data = JSON.parse(body);
    //return data;
    res.render("landing", {data: data});
    });
    
});


// Tasks Page
app.get("/tasks", function(req, res){
    res.render("tasks");
});

// Manuals Instructions
app.get("/tasks/manuals", function(req, res){
    res.render("manuals");
});

// Dailies Instructions
app.get("/tasks/dailies", function(req, res){
    res.render("dailies");
});

// Training Instructions
app.get("/tasks/training", function(req, res){
    res.render("training");
});

// Commissioning Instructions
app.get("/tasks/commissioning", function(req, res){
    res.render("commissioning");
});

// Spareparts Instructions
app.get("/tasks/spareparts", function(req, res){
    res.render("spareparts");
});

// Staff Page
app.get("/staff", function(req, res){
    res.render("staff", {staffPage: true});
});

// Create Staff Form
app.get("/staff/edit", function(req, res){
    res.render("editstaff");
});

// listen
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("works");
});