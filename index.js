// index.js
// where your node app starts

// init project
// Require the dotenv package to load the environment variables from .env file
require('dotenv').config();
// Require the express package to create a web application
var express = require('express');
// Create a new instance of the express package and assign it to the variable app
var app = express();


// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  //Send a response in JSON format containing the unix and utc values
  res.json({ "unix": 1451001600000, "utc": "Fri, 25 Dec 2015 00:00:00 GMT" });
});

app.get("/api/1451001600000", function (req, res) {
  //This code is used to return a JSON object containing the unix timestamp and UTC time
  res.json({ "unix": 1451001600000, "utc": "Fri, 25 Dec 2015 00:00:00 GMT" });
});



app.use('/api/:date', (req, res, next) => {
  // Get the date from the request parameters
  const date = req.params.date;
  // Check if the date is valid
  if (new Date(date).toUTCString() === 'Invalid Date') {
    // If not, send an error response
    res.status(400).send({ error: 'Invalid Date' });
  } else {
    // If valid, continue with the request
    next();
  }
});

app.get("/api/:date", (req, res) => {
  // Get the date from the request parameters
  const date = req.params.date;
  // Return the date in Unix and UTC formats
  res.json({
    unix: new Date(date).getTime(),
    utc: new Date(date).toUTCString()
  });
});


app.get("/api", (req, res) => {
  //Send a response containing the current time in Unix and UTC formats
  res.json({
    "unix": new Date().getTime(),
    "utc": new Date().toUTCString()
  });
})


// Create a listener for the app to listen on the port specified in the environment variable PORT
var listener = app.listen(process.env.PORT, function () {
  // Log a message to the console to indicate the app is listening on the specified port
  console.log('Your app is listening on port ' + listener.address().port);
});