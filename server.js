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

app.get("/api/timestamp/:date", function (req, res) {
  var data = req.params.date;
  if(isNaN(data)) {
    //if entry is yyyy-mm-dd
    var unixFormat = new Date(data).getTime()/1000;
    var date = new Date(unixFormat * 1000);
    var utc = date.toUTCString();
  } else {
    //if entry is unix
    var date = new Date(data * 1000);
    var utc = date.toUTCString();
    var unixFormat = parseInt(data);
  }
  res.json({ 
    unix: unixFormat,
    utc: utc
  });
});

app.get("/api/timestamp/:date", function(req, res) {
  var time = new Date();
  var unix = time.getTime();
  var utc = time.toUTCString();
  
  res.json({
    unix: unix,
    utc: utc
  });
});
    



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
