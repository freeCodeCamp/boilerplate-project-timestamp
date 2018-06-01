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
// app.get("/api/hello", function (req, res) {
//   res.json({greeting: 'hello API'});
// });

function getDate(date_string) {
  var date = new Date(date_string);

    if (/^\d*$/.test(date_string)) {
      // convert into milliseconds
      date = new Date(parseInt(date_string));
    }
    return date;
}

app.get('/api/timestamp/:date_string', function (req, res){
  var date_string = req.params.date_string;
  var date, date_json;

  if (!date_string && date_string.trim().length === 0) {
    date = new Date();
  } else {
    date = getDate(date_string);
  }

  if (!isNaN(date.getTime())){
    date_json = {unix: date.getTime(), utc: date.toUTCString()};
  } else {
    date_json = {unix: null, utc : "Invalid Date"};
  }
  res.json(date_json);
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 8080, process.env.IP || "0.0.0.0", function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
