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


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/timestamp', (req,res) => {
  res.json({unix: Date.now(), utc: Date()})
})

app.get('/api/timestamp/:dateValue', (req,res) => {
  var dateValue = req.params.dateValue;
//Options for formatting date
  let date;
  if(/\D/.test(dateValue)) {
    date = new Date(dateValue);
  } else {
    date = new Date(parseInt(dateValue))
  }
  if(date == "Invalid Date") {
    res.json({"error": "Invalid Date"})
  }
 let UTCDate = date.toUTCString();
 let unixDate = date.getTime();

 res.json({"unix": unixDate, "utc": UTCDate})

})


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
