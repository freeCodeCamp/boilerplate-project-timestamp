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

//Function to check if date is valid
let isValidDate = function(d) {
  return d instanceof Date && !isNaN(d);
};

app.route('/api/:date?').get(function(req, res){
  let input = req.params.date;
  let responseObject = {};
  
  //An empty date parameter should return the current time in a JSON object with a unix and UTC key
  if (input === undefined){
    let date = new Date();
    responseObject['unix']= Math.round(date);
    responseObject['utc']= date.toUTCString();
  }
  else {
    // If the input date string is invalid, the api returns an object having the structure 
    // { error : "Invalid Date" }
    if(!isValidDate(new Date(input)) && !isValidDate(new Date(parseInt(input)))) {
      responseObject['error'] = "Invalid Date";
    } 
    //Date is valid
    else {
      let date;
      //Date is valid but date is in unix format
      if(!isValidDate(new Date(input))){
        date = new Date(parseInt(input));
      } 
      //Date is valid but is in non-unix format
      else {
        date = new Date(input);  
      }
      responseObject['unix']= Math.round(date);
      responseObject['utc']= date.toUTCString();
    }
  }
  res.json(responseObject);
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
