// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date?", function (req, res) {
  const dateParam = req.params.date;

  // Check if the date parameter is empty
  if (!dateParam) {
    const currentUnix = Date.now(); // Return Unix timestamp in milliseconds
    const currentUTC = new Date().toUTCString();
    res.json({ unix: currentUnix, utc: currentUTC });
    return;
  }

  // Check if the provided parameter is a valid number
  const isUnixTimestamp = /^\d+$/.test(dateParam);
  if (isUnixTimestamp) {
    const unixTimestamp = parseInt(dateParam, 10);
    const utcFromUnix = new Date(unixTimestamp).toUTCString();

    res.json({ unix: unixTimestamp, utc: utcFromUnix });
    return;
  }

  // Parse the date and check if it's a valid date
  const parsedDate = new Date(dateParam);
  if (isNaN(parsedDate.getTime())) {
    res.json({ error: "Invalid Date" });
    return;
  }

  // Convert the date to Unix timestamp in milliseconds and UTC string
  const unix = parsedDate.getTime(); // Return Unix timestamp in milliseconds
  const utc = parsedDate.toUTCString();

  res.json({ unix: unix, utc: utc });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
