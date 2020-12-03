// server.js
// where your node app starts

// init project
require('dotenv').config();
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

app.get("/api/timestamp", function(req, res) {
  var newDate = new Date();
  res.json({unix: newDate.getTime(), utc: newDate.toUTCString()});
})

app.get("/api/timestamp/:date_string", function(req, res) {
  var date_string = req.params.date_string;
  var date = new Date(date_string);
  if (date.toUTCString() === "Invalid Date") {
    var uDate = new Date(+date_string);
    if (uDate.toUTCString() === "Invalid Date") {
      res.json({error: uDate.toUTCString()});
    } else {
    res.json({unix: uDate.getTime(), utc: uDate.toUTCString()});
    }
  } else {
  res.json({unix: date.getTime(), utc: date.toUTCString()});
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
