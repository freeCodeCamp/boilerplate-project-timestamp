// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get("/api/:date?", (req, res) => {
  let date = req.params.date;

  if (!date) {
    // If the date parameter is empty, return the current time
    let dateObject = new Date();
    res.json({ unix: dateObject.getTime(), utc: dateObject.toUTCString() });
  } else {
    // Check if the date parameter is a valid number
    if (/^\d+$/.test(date)) {
      let dateInt = parseInt(date);
      res.json({ unix: dateInt, utc: new Date(dateInt).toUTCString() });
    } else {
      let dateObject = new Date(date);

      if (dateObject.toString() === "Invalid Date") {
        res.json({ error: "Invalid Date" });
      } else {
        res.json({ unix: dateObject.getTime(), utc: dateObject.toUTCString() });
      }
    }
  }
})

// Listen on the port set in the environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});