const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const expressSanitizer = require("express-sanitizer");


// APP CONFIG


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