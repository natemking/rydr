const express = require("express");

const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;
const morgan = require('morgan');
const compression = require('compression')




// MIDDLEWARE
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
// SERVE STATIC ASSETS DEPLOYED (usually on heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}
app.use(compression)
// You can set morgan to log differently depending on your environment
if (app.get('env') == 'production') {
  app.use(morgan('common', { skip: function(req, res) { return res.statusCode < 400 }, stream: __dirname + '/../morgan.log' }));
} else {
  app.use(morgan('dev'));
}
// SERVE UP STATIC ASSETS LOCALLY
app.use(express.static('client/public'));

// ACCESS ROUTES FROM ROUTES DIRECTORY/FOLDER
app.use(routes);

// START API SERVER
app.listen(PORT, function () {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
