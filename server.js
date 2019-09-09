var cheerio = require("cheerio");
var axios = require("axios");
var MONGOLAB_IVORY_URI = process.env.MONGOLAB_IVORY_URI;
var express = require("express");
var app = express();
var mongoose = require("mongoose");
const Article = require("./models/Article");

//Test
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect("mongodb://localhost/scraperdb", { useNewUrlParser: true });

app.use(express.static('public'));

//Test

axios.get("https://chicago.suntimes.com/").then(function(response) {

  
  var $ = cheerio.load(response.data);

  var results = [];

  
  $("h2").each(function(i, element) {

    var title = $(element).text();

    var link = $(element).children().attr("href");

    results.push({
      title: title,
      link: link
    });
  });

 console.log(results);
  if (results.push){
    Article.findByIdAndUpdate(
      { title: response.data.title },
      { $push: { "title": response.data.show } }, { new: true }
  ).then(function (dbResponse) {
      console.log(dbResponse);
      response.json(res.data);
  }).catch(function (err) {
      console.log(err);
      res.sendStatus(500)
  });

} else {
  response.json({ "error": "true" });
}
});
  

// app.get("/all", function(req, res) {
//     // Query: In our database, go to the articles collection, then "find" everything
//     db.scrapedData.find({}, function(error, found) {
//       // Log any errors if the server encounters one
//       if (error) {
//         console.log(error);
//       }
//       // Otherwise, send the result of this query to the browser
//       else {
//         res.json(found);
//       }
//     });
//   });
//   app.get("/scrape", function(req, res) {
//     // Query: In our database, go to the animals collection, then "find" everything,
//     // but this time, sort it by name (1 means ascending order)
//     db.scrapedData.find().sort({ date: 1 }, function(error, found) {
//       // Log any errors if the server encounters one
//       if (error) {
//         console.log(error);
//       }
//       // Otherwise, send the result of this query to the browser
//       else {
//         res.json(found);
//       }
//     })});