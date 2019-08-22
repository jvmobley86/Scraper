var express = require("express");
var mongojs = require("mongojs");
// var request = require("request");
var cheerio = require("cheerio");
var axios = require("axios");
var mongoose = require("mongoose");
const db = require("./models/Article.js");
require('make-promises-safe');


var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI), {
    useMongoClient: true,
};
// mongoose.connect("mongodb://localhost/mongoHeadlines", { useNewUrlParser: true });
// Make public a static folder
app.use(express.static("public"));

var databaseUrl = "mongodb://localhost:27017";
var MongoClient = require('mongodb').MongoClient;
 
// Make a connection to MongoDB Service
// MongoClient.connect(databaseUrl, function(err, db) {
//   if (err) throw err;
//   console.log("Connected to MongoDB!");
//   db.close();
// });
var results = [];
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
 
// db.once('open', function() {
//   console.log("Connection Successful!");
// });


var database= mongojs(databaseUrl, results);
db.on("error", function (error) {
    console.log("Database Error:", error);
});

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + "./public/index.html"));
});
axios.get("https://chicago.suntimes.com/").then(function (response) {
    var $ = cheerio.load(response.data);

    $("article").each(function (i, element) {
        var result = {};

        result.title = $(this)
            .children("a")
            .text();
        result.link = $(this)
            .children("a")
            .attr("href");

        // var title = $(element).children().text();
        // var link = $(element).find("a").attr("href");
        
        //Create new article from results
        (db.Article.create(result)
        .then(function(dbArticle) {
          // View the added result in the console
          console.log(dbArticle);
        })
        .catch(function(err) {
          // If an error occurred, log it
          console.log("this will not be printed");
        })
    )});

    

    //     results.push({
    //       title: title,
    //       link: link,

    // });
    console.log(results);
    res.send("/articles.html");
});


// app.get("/", function (req, res) {
//     res.send(index.html);
// });


// app.get("/all", function (req, res) {

//     db.scrapedData.find({}, function (error, found) {

//         if (error) {
//             console.log(error);
//         }
//         else {
//             res.json(found);
//         }
//     });
// });
// });

// app.get("/scrape", function (req, res) {

//     if (title && link) {
//         db.scrapedData.save({
//             title: title,
//             link: link
//         },
//             function (err, saved) {
//                 if (err) {

//                     console.log(err);
//                 }
//                 else {

//                     console.log(saved);
//                 }
//             });
//     }
// });



app.listen(27017, function () {
    console.log("App running on port 27017!");
});