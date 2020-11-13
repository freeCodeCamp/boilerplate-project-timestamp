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
  res.json({greeting: 'Hello, welcome to the Timestamp API'});
});
app.get('/api/timestamp', function(req,res){
	res.json({unix: Date.now(), utc: Date()});
});

app.get('/api/timestamp/:date', function(req,res){
	var date = req.params.date;
  var unixRegex = /\d{5,}/;
  
  if (unixRegex.test(date)){
    let dateInt = parseInt(date);
    res.json({unix:date,utc: new Date(dateInt).toUTCString()});
  }
  
  let dateObj = new Date(date);
  
  if (dateObj.toString() === 'Invalid Date'){
    res.json({error: 'Invalid Date', reason: 'You stupid'});
  }
  else{
    res.json({unix: dateObj.valueOf(), utc: dateObj.toUTCString()});
  }
  
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
