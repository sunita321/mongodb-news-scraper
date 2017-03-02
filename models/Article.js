// Require Mongoose
var mongoose = require('mongoose');

// require the connection
var db = require("../config/connection");


// Create a Schema Class
var Schema = mongoose.Schema;

// Create article schema
var ArticleSchema = new Schema({
  // title is a required string
  title: 
  {
    type: String,
    required: true,
    unique: true,
    dropDups: true
  },
  // link is a required string
  link: 
  {
    type: String,
    required: true,
    unique: true
  },
  
note: [{
    // Store ObjectIds in the array
    type: Schema.Types.ObjectId,
    // The ObjectIds will refer to the ids in the Note model
    ref: "Note"
  }]
});

// Create the Article model with the ArticleSchema
var Article = mongoose.model("Article", ArticleSchema);

// Export the model
module.exports = Article;
