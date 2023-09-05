// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// Define a new route for handling date requests
app.get("/api/:date?", (req, res) => {
  // Get the date parameter from the request
  const dateParam = req.params.date;

  // Check if the dateParam is empty or not provided
  if (!dateParam) {
    // If dateParam is empty, return the current time
    const currentDate = new Date();
    res.json({ unix: currentDate.getTime(), utc: currentDate.toUTCString() });
  } else {
    // Try to parse the provided date parameter
    const parsedDate = new Date(dateParam);

    // Check if the parsed date is valid
    if (!isNaN(parsedDate.getTime())) {
      // If valid, return the Unix timestamp and UTC string
      res.json({ unix: parsedDate.getTime(), utc: parsedDate.toUTCString() });
    } else {
      // If invalid, return an error message
      res.json({ error: "Invalid Date" });
    }
  }
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
