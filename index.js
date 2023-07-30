// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();
// require("dotenv").config();
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
app.get("/api/:date", function (req, res) {
  const weekday = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let { date } = req.params;
  let newDate = date;
  date = date.indexOf("-") > -1 ? date : date * 1000;
  const unix =
    newDate.indexOf("-") > -1
      ? new Date(date).getTime()
      : new Date(date).getTime() / 1000;
  let full = new Date(date);
  let hour = full.getHours() > 10 ? full.getHours() : "0" + full.getHours();
  let min =
    full.getMinutes() > 10 ? full.getMinutes() : "0" + full.getMinutes();
  let sec =
    full.getSeconds() > 10 ? full.getSeconds() : "0" + full.getSeconds();
  let utc = `${weekday[full.getDay()]}, ${full.getDate()} ${
    month[full.getMonth()]
  } ${full.getFullYear()} ${hour}:${min}:${sec} GMT`;
  res.json({ unix: unix, utc: utc });
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
