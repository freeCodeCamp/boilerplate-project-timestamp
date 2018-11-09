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

//timestamp API endpoint...
app.get("/api/timestamp/:date_string", function (req, res) {
  let time_stamp = (req.params.date_string) ? new Date(req.params.date_string) : new Date();
  if(time_stamp.toString() === 'Invalid Date' && Date.parse(parseInt(req.params.date_string)) !== NaN){
    time_stamp = new Date(parseInt(req.params.date_string));
  }
  else if(time_stamp.toString() === 'Invalid Date'){
    res.json({error: 'Invalid Date'})
    return res.end();
  }
  res.json({
    unix: time_stamp.getTime(),
    utc: time_stamp.toUTCString()
  })
  return res.end();
})


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
