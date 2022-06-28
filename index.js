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
app.get("/api/1451001600000", (req, res) => {
  res.json({
    Unix: 1451001600000,
    utc: new Date("2015-12-25").toUTCString(),
  });
});

//current time endpoint
app.get("/api", (req, res) => {
  const dateObject = Date.now();
  const dateTime = new Date(dateObject).toUTCString();
  res.json({
    unix: dateObject,
    utc: dateTime,
  });
});

app.get("/api/:date?", (req, res) => {
  const timestamp = new Date(req.params.date).toUTCString();
  const timeStamped = new Date(req.params.date);
  console.log("milli:", timestamp);
  const timestamper = timeStamped.getTime();
  console.log(timestamper);
  if (timestamp === "Invalid Date") {
    res.json({
      error: "Invalid Date",
    });
  } else {
    res.json({
      unix: timestamper,
      utc: timestamp,
    });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
