// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

// Requiring Note and Article models
var Note = require("./models/Note.js");
var Article = require("./models/Article.js");

//Require scraping tools
var request = require("request");
var cheerio = require("cheerio");

// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

// Initialize Express
var app = express();

// Use morgan and body parser with our app
app.use(logger("dev"));
app.use(bodyParser.urlencoded(
{
	extended: false
}));


// Make public a static dir
app.use(express.static("public"));


// Express-Handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


// Database configuration with Mongoose
mongoose.connect("mongodb://localhost/news-scraper");
var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) 
{
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() 
{
  console.log("Mongoose connection successful.");
});
