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



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

app.get("/api/timestamp/:dateString?", (req, res) => {
  const dateString = req.params.dateString;
  
  let date;
  
  //If the date string is empty it should be equivalent to trigger new Date(); and use current timestamp.
  if (!dateString) {
    date = new Date();
  } else {
    //If the date string is a number convert the string to an integer and make a date from the integer.
    if(!isNaN(dateString)) {
      date = new Date(parseInt(dateString));
    } else {
      //Make a date from the string.
      date = new Date(dateString);
    }
  }
  //If the date string is invalid return a JSON with object {"error": "Invalid Date"}.
  if (date.toString() === "Invalid Date") {
    res.json({ error: date.toString() });
  } else {
    //If the date string is valid return a JSON object {"unix": <date.getTime()>, "utc": <date.toUTCString()>}
    res.json({ unix: date.getTime(), utc: date.toUTCString() });
  }
});