// index.js
// where your node app starts

// init project
const express = require('express');
const app = express();
const path = require('path');


// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

app.set('view engine', 'ejs'); // You can use 'ejs' or any other template engine

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// Handle requests to /api/:date
app.get("/api/:date?", function (req, res) {
  let dateString = req.params.date;
  let parsedDate;

  // Check if the parameter is a Unix timestamp (numeric value)
  if (!isNaN(dateString) && !isNaN(parsedDate = parseInt(dateString))) {
    parsedDate = new Date(parsedDate);
  // If not a numeric value, attempt to parse as a date string
  } else if (typeof dateString === "string") {    
    parsedDate = new Date(dateString);
  } else {
    parsedDate = new Date();
  }

  if (isNaN(parsedDate.getTime())) {
    // If not valid, return an error JSON object
    res.json({ error: "Invalid Date" });
  } else {
    // If valid, create a JSON object with the Unix timestamp
    res.json({
      unix: parsedDate.getTime(),
      utc: parsedDate.toUTCString()
    });
  }
});


// Handle requests to /api
app.get("/api/", function (req, res) {
  res.json({ 
    unix: new Date().getTime(),
    utc: new Date().toUTCString() 
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
