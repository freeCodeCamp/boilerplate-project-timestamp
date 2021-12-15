// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
const bodyParser = require('body-parser');
let moment = require('moment');
//to parse use data
app.use(bodyParser.urlencoded({ extended: false }))


// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
const { json } = require('body-parser');
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

//to get param from user url
app.get ('/api/:date?', (req, res) =>{
  const newDate = req.params.date;

if (newDate === ' ') {
  return res.json({"unix": new Date().getTime()/1000,  "utc": new Date()});
}
else if (/^\d*$/.test(newDate)) {
  return res.json({"unix": newDate, "utc": new Date(newDate/1000).toUTCString()})
}
 
else if (newDate.toString() === "Invalid Date") {
  return res.json ({ "error": "Invalid Date" })
}

else {
  return res.json({ "unix": new Date(newDate).getTime()/1000, "utc": new Date(newDate).toUTCString()})
}
});


// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
