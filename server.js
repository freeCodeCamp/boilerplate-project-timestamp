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
  let newDate = req.params.date;
  // const date = new Date(reqDateString)
  // const unixDate = date.getTime();
  const utcDate = new Date(newDate).toUTCString();

  if (newDate === undefined) {
    return res.json({ "utc": new Date() });
  }
  
  if (newDate !== undefined && newDate.includes('-') === true) {
    return res.json ({ "unix": new Date(newDate).getTime(), "utc" : new Date(newDate).toUTCString()  })
  }

  if(newDate.includes('-') === false ) {
    newDate = Number(newDate)
    return res.json ({ "unix": newDate, "utc" : new Date(newDate).toUTCString()  })
  }

  if( utcDate === "Invalid Date") {
    res.json({ "error" : "Invalid Date" })

  };
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
