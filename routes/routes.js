// dependencies
var express = require('express');
var router = express.Router();
var Article = require('../models/Article');
var Note = require('../models/Note');
var scraper = require('../controller/scraper');


// home page 
router.get('/', function(request, response) 
{

	// get all the articles
	Article.find({}, function(error, data) 
	{

		// check for error getting articles
		if (error) console.log("error getting articles", error);

		response.render('index', {title: "NewsScraper", articles: data});
	
	});

}); 


// scrape route
router.get('/scrape', function(request, response) 
{

	// run the scrapedWeb function from scraper
	scraper.scrapedWeb(function() 
	{

		// scrape then return to home page
		response.redirect('/');
	});
});

// get notes route
router.get('/note/:id', function(request, response) 
{
	Article.findOne({_id: request.params.id})
		.populate("note")
		.exec(function(error, doc) {
			if (error) console.log("error getting notes", error);

			response.send(doc.note);
			
		});
});

// post notes route
router.post('/note/:id', function(request, response) 
{

	var newNote = new Note(request.body);

	newNote.save(function(error, doc) 
	{
		Article.findOneAndUpdate(
			{_id: request.params.id},
			{$push: {note: doc._id}},
			{new: true},
			function(err, anotherDoc) {
				if (error) console.log("post error", error);
				response.send(anotherDoc);
			});
	});
});


// delete note 
router.post('/deleteNote/:id', function(request, response) 
{
	console.log(request.params.id);
	
	Note.findByIdAndRemove({_id: request.params.id}, function(error) 
	{
		if (error) console.log('error deleting note', error);
		response.send();
	});
})


module.exports = router;