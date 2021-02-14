const express = require("express");
var cloudinary = require('cloudinary').v2;
const logger = require('morgan');
const routes = require("./routes");
require('dotenv').config()
const app = express();
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 3001;

// MIDDLEWARE
app.use(logger('dev'));
app.use(express.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(express.json());
// SERVE STATIC ASSETS DEPLOYED (usually on heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

// SERVE UP STATIC ASSETS LOCALLY
app.use(express.static('client/public'));

// ACCESS ROUTES FROM ROUTES DIRECTORY/FOLDER
app.use(routes);

// START API SERVER
app.listen(PORT, function () {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
