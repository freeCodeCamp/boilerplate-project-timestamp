// index.js
// where your node app starts

// init project

var express = require('express');
var app = express();

require('dotenv').config();


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


// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

app.use('/api/:date', (req, res) => {
  let dateInput = req.params.date;
  
  (dateInput == parseInt(dateInput).toString()) ? (dateInput = parseInt(dateInput)) : null;
  let date = (new Date(dateInput)).toUTCString();
  
  if (date == 'Invalid Date') {
    res.json({'error': "Invalid Date"});
  }
  else {
    res.json({'unix':`${Date.parse(date)}`, 'utc':`${date}`});
  }
})