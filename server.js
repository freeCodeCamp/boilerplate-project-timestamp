// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function(req, res) {
  res.json({ greeting: 'hello API' });
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});


//code
app.get("/api/timestamp/:date?",
  function(req, res) {
    var reqDate = isNaN(req.params.date) ? req.params.date 
                                        : parseInt(req.params.date)
    if (reqDate == undefined){
      res.json({ 
          unix: Date.now(),
          utc: new Date().toUTCString()
        })
    } 
    else {
      var date = new Date(reqDate)
      var utcFormat = date.toUTCString()
      var unixFormat = date.valueOf()
      if (date == "Invalid Date") {
        res.json({ error: "Invalid Date"})       
      } else {
        res.json({ 
          unix: unixFormat,
          utc: utcFormat
        })
      }     
    }
  })