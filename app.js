const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const expressSanitizer = require("express-sanitizer");


// APP CONFIG
mongoose.connect(`mongodb://localhost:${process.env.PORT}/RESTful-blog-app`, {useNewUrlParser: true});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(expressSanitizer());


// MONGOOSE/MODEL CONFIG


// TEST CREATION


// RESTFUL ROUTES


// INDEX ROUTE


// NEW ROUTE


// CREATE ROUTE


// SHOW ROUTE


// EDIT ROUTE


// UPDATE ROUTE


// DELETE ROUTE


app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server started, listening on port " + process.env.PORT);
});


////////////////