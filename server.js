// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/:datedata?", (req, res) => {
  const datedata = req.params.datedata;
  let date;
  if (!datedata) {
  date = new Date();
    return res.json({ "unix": date.getTime(), "utc": date.toUTCString() });
  } else if(isNaN(datedata) && isNaN(Date.parse(datedata))) {
    return res.status(400).json({ "error": "Invalid Date" });
  } else {
date = isNaN(datedata) ? new Date(datedata) : new Date(Number(datedata));
  }
res.json({ "unix": date.getTime(), "utc": date.toUTCString() });
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
