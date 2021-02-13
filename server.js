const express = require("express");

const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

// MIDDLEWARE
app.use(express.urlencoded({
    extended: true
}));
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
