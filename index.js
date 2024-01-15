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


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// timestamp endpoint

app.get("/api/:date", function (req, res) {
  let dateS = req.params.date;
  let milliseconds = dateS * 1000;

  function isValidDateFormat(inputDate) {
    // Regular expression for the "YYYY-MM-DD" format
    var dateFormat = /^\d{4}-\d{2}-\d{2}$/;

    // Test if the input matches the format
    return dateFormat.test(inputDate);
  }

  if (isValidDateFormat(dateS)) {
    milliseconds = dateS; 
  } else {
    milliseconds = dateS * 1000;
  }
  
  var newDate = new Date(milliseconds);
  var utcDate = newDate.toUTCString();
  var unixDate = newDate.getTime();

  if (utcDate === "Invalid Date") {
    res.json({error: "Invalid Date"});
  }else if (unixDate === "Invalid Date") {
    
    res.json({error: "Invalid Date"});
  }else{
    res.json({ unix: unixDate, utc: utcDate });
  }; 

  
});





// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
