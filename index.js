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
// Helper function to format the date
function formatDate(date) {
  return {
    unix: date.getTime(),
    utc: date.toUTCString()
  };
}

app.get('/api/:date?', (req, res) => {
  const { date } = req.params;

  // Handle the case where no date is provided
  if (!date) {
    const currentDate = new Date();
    res.json(formatDate(currentDate));
    return;
  }

  // Try to parse the date as a number (Unix timestamp) or as a date string
  let parsedDate;
  if (!isNaN(date)) {
    parsedDate = new Date(parseInt(date));
  } else {
    parsedDate = new Date(date);
  }

  // Check if the parsed date is valid
  if (!isNaN(parsedDate.getTime())) {
    res.json(formatDate(parsedDate));
  } else {
    res.json({ error: "Invalid Date" });
  }
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
