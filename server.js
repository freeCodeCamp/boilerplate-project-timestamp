// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

app.set("view engine", "ejs")

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

var number = 0;
var string = "";

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.render("index", {Number: number, String: string})
});



// your first API endpoint... 
app.get("/api/:utc", function (req, res) {
  var utc = req.params.utc;
  const date = new Date(parseInt(utc));
  const dateObj = {"unix": parseInt(utc), "utc": date.toString()};
  const valArr = Object.values(dateObj);
  number = valArr[0];
  string = valArr[1];
  const errorObj = { error : "Invalid Date" };
 
  if (date == "Invalid Date") {
    res.json(errorObj)
  } else {
    res.json(dateObj)
  }
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
