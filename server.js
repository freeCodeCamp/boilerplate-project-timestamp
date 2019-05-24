// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

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

const canDateBeParsed = function(str) {
    var date = new Date(str);
    if (Date.parse(date)) return true;
    return false;
};

app.get("/api/timestamp/:date_string?", function(req, res) {
  var date;
  if (req.params.date_string === undefined) {
    date = new Date();
    return res.json({"unix": Date.parse(date), "utc": date.toUTCString()})
  };
  if (canDateBeParsed(req.params.date_string)) {
    date = new Date(req.params.date_string);
    return res.json({"unix": Date.parse(date), "utc": date.toUTCString()})
  } else {
    return res.json({"error": "Invalid Date"})
  }
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
