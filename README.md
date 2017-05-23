# MongoDB-news-scraper
This is a web app that lets users leave comments on the latest news. It usees your Mongoose and Cheerio to scrape news from another site.

NPM Packages used:
express
express-handlebars
mongoose
body-parser
cheerio
reques

Whenever a user visits my site, the app will scrape stories from a news outlet of your choice. 

It uses Cheerio to grab the site content and Mongoose to save it to your MongoDB database.

All users can leave comments on the stories you collect. They are also allowed to delete whatever comments they want removed. 
All stored comments are visible to every user.
It uses Mongoose's model system to associate comments with particular articles.
