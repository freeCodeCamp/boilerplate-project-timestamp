// index.js
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

/* ****************************************************************** */

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


app.get("/api/", function(req, res) {
  let date = new Date();
  let utcDate = date.toUTCString();
  let unix = parseInt((new Date(utcDate).getTime()).toFixed(0));

  res.json({unix: unix, utc: utcDate})
})

app.get("/api/:date", function(req, res) {
  let dateReq = req.params.date;
  let date;
  
  // Type of date:
  if (!isNaN(dateReq)) {
    date = new Date(parseInt(dateReq));
  } else {
    date = new Date(dateReq);
  }
  
  // Valid date:
  if (date.toString() === 'Invalid Date') {
    return res.status(400).json({ error: 'Invalid Date' });
  }

  
  let utcDate = date.toUTCString();
  let unix = parseInt((new Date(utcDate).getTime()).toFixed(0));
  
  res.json({unix: unix, utc:utcDate})
})


/* ****************************************************************** */

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3005, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
