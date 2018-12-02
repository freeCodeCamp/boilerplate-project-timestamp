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

app.route('/api/timestamp/:date?')
  .get(function (req, res){

    var date = new Date(Date.now());
    var response = {};

    if (req.params.date === undefined) {
      // no parameter passed so respond with current time...
      response =  {
        "unix": date.getTime(),
        "utc": date.toUTCString()
      };
      console.log("Timestamp undefined");
    } 
    else {
      console.log("Passed timestamp data: " + req.params.date)
      // ...otherwise check if it is a unix timestamp (typecast to number)
      var timeStamp = parseInt(req.params.date/1);

      if (isNaN(timeStamp)) {
        console.log("Passed timestamp data isNaN.");
        // it isn't a unix timestamp, but hopefully a valid Date object
        date = new Date(req.params.date);
      } 
      else {
        // hopefully it is a valid Unix timestamp
        date = new Date(timeStamp);
        console.log("Considering " + timeStamp + " to be a valid timestamp.");
      }

      // Use simple equality ('==') because invalid date message can be 'Invalid Date {}'
      if (date == "Invalid Date") {
        response = {error: "Invalid Date"};
      } 
      else {
        // this date is from passed timestamp, not from initial variable declaration!
        response = {
          "unix": date.getTime(),
          "utc": date.toUTCString()
        };
      }
    }

    res.json(response);
  });


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// Catch page not found/ error 404
app.use(function(req, res, next) {
  res.status(404)
    .type('text')
    .send('Page not Found (error 404). Please try another address.');
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 8080, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});