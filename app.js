// const dotenv = require("dotenv");
// dotenv.config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const expressSanitizer = require("express-sanitizer");


// APP CONFIG
mongoose.connect("mongodb://localhost/RESTful-blog-app", 
	{useNewUrlParser: true, useFindAndModify: false});
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
	res.redirect("/blogs");
});


// INDEX ROUTE
app.get("/blogs", function(req, res) {
	Blog.find({}, function(err, blogs) {
		if (err) {
			console.log("An error occurred:");
			console.log(err);
		} else {
			res.render("index", {blogs: blogs});
		}
	});
});


// NEW ROUTE
app.get("/blogs/new", function(req, res) {
	res.render("new");
});


// CREATE ROUTE
app.post("/blogs", function(req, res) {
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.create(req.body.blog, function(err, newBlog) {
		if (err) {
			console.log("An error occurred:");
			console.log(err);
			console.log("Re-rendering new-entry form...");
			res.render("new");
		} else {
			res.redirect("/blogs");
		}
	});
});


// SHOW ROUTE
app.get("/blogs/:id", function(req, res) {
	Blog.findById(req.params.id, function(err, foundBlog) {
		if (err) {
			console.log("An error occurred:");
			console.log(err);
			console.log("Redirecting to index page...");
			res.redirect("/blogs");
		} else {
			res.render("show", {blog: foundBlog});
		}
	});
});


// EDIT ROUTE
app.get("/blogs/:id/edit", function(req, res) {
	Blog.findById(req.params.id, function(err, foundBlog) {
		if (err) {
			console.log("An error occurred:");
			console.log(err);
			console.log("Redirecting to index page...");
			res.redirect("/blogs");
		} else {
			res.render("edit", {blog: foundBlog});
		}
	});
});


// UPDATE ROUTE
app.put("/blogs/:id", function(req, res) {
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog) {
		if (err) {
            console.log("An error occurred:");
            console.log(err);
            console.log("Redirecting to index...");
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs/" + req.params.id);
        }
	});
});


// DELETE ROUTE
app.delete("/blogs/:id", function(req, res) {
	Blog.findByIdAndRemove(req.params.id, function(err) {
		if (err) {
            console.log("An error occurred:");
            console.log(err);
            console.log("Redirecting to index...");
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs");
        }
	});
});


app.listen(9000, process.env.IP, function() {
    console.log("Server started");
});


////////////////