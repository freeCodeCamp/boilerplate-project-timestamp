// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// API TimeStamp Endpoint
app.get("/api/timestamp/:dateString?", (request, response) => {
  const dateString = request.params.dateString;

  let date;

  // Empty dateString, response with current time
  if (!dateString) {
    date = new Date();
  } else {
    // dateString is not empty, parse and convert if integer
    if (!isNaN(dateString)) {
      date = new Date(parseInt(dateString));
    } else {
      // dateString is good as it is
      date = new Date(dateString);
    }
  }
  // Invalid dateString using standard date class, respond with error
  if (date.toString() === "Invalid Date") {
    response.json(
      {
        error: date.toString()
      }
    );
  } else {
    // Ok Response
    response.json(
      {
        unix: date.getTime(),
        UTC: date.toUTCString()
      }
    );
  }

});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});