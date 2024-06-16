// index.js
// where your node app starts
require('dotenv').config();
// init project
var express = require('express');
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
app.get("/api/:date?", function (req, res) {
  let date = req.params.date;

  let unixDate;
  let dateObj;
  let utcDate;

  // Test whether the input date is a number
  let isUnix = /^\d+$/.test(date);

  // If no date specified, use the current date
  if (!date) {
    dateObj = new Date();
  }
  // If the date is a Unix Timestamp
  else if (date && isUnix) {
    unixDate = parseInt(date);
    dateObj = new Date(unixDate);
  }
  // If the date is not a unix time stamp
  else if (date && !isUnix) {
    dateObj = new Date(date);
  }

  if (dateObj.toString() === "Invalid Date") {
    res.json({ error: "Invalid Date" });
    return;
  }

  unixDate = dateObj.getTime();
  utcDate = dateObj.toUTCString();

  res.json({ unix: unixDate, utc: utcDate });
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
