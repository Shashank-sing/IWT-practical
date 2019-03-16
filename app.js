// const dotenv = require("dotenv");
// dotenv.config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const expressSanitizer = require("express-sanitizer");


// APP CONFIG
mongoose.connect("mongodb://localhost:28017/RESTful-blog-app", {useNewUrlParser: true});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(expressSanitizer());


// MONGOOSE/MODEL CONFIG
const blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: {type: Date, default: Date.now}
});

const Blog = mongoose.model("Blog", blogSchema);


// TEST CREATION

// Blog.create({
// 	title: "First post!",
// 	image: "https://cdn.pixabay.com/photo/2014/05/02/21/50/home-office-336378_1280.jpg",
// 	body: "Hi everybody! I'm excited to be starting my own blog :)"
// }, function(err, blog) {
// 	if (err) {
// 		console.log(err);
// 	} else {
// 		console.log(blog);
// 	}
// });


// RESTFUL ROUTES

app.get("/", function(req, res) {
	Blog.find({}, function(err, blogs) {
		if (err) {
			console.log("oh nooo, error");
			console.log(err);
		} else {
			res.send("Here is the index page!");
			console.log("here are the blogs");
			console.log(blogs);
		}
	});
});


// INDEX ROUTE


// NEW ROUTE


// CREATE ROUTE


// SHOW ROUTE


// EDIT ROUTE


// UPDATE ROUTE


// DELETE ROUTE


app.listen(28017, process.env.IP, function() {
    console.log("Server started");
});


////////////////