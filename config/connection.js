// require mongoose
var mongoose = require('mongoose');


// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

// Connect to localhost if not a production environment
if(process.env.NODE_ENV == 'production')
{
  mongoose.connect('mongodb://heroku_s83s967g:dpumr23t35v43ogmif26fhrph5@ds113660.mlab.com:13660/heroku_s83s967g');
}
else
{
  mongoose.connect('mongodb://localhost/news-scraper');
}

var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) 
{
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() 
{
  console.log("Mongoose connection successful!");
});

// export the database
module.exports = db;
