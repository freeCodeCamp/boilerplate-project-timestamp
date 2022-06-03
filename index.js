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



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});


/*app.get('/api/:first', (req, res) => {
  let date_string = req.params.first;
  console.log(date_string);
  if (date_string == null) {
    var date = new Date();
  }
  else {
    var date = new Date(date_string);
  }
  console.log(date);
  console.log(date_string);
  let jsonObj = {'unix':date,'utc':date};
  res.send(jsonObj);
});*/


app.get('/api/:first', (req, res) => {
  let date_string = req.params.first;
  console.log(date_string);
  if(req.query.first != null ) {date_string = (new Date(req.params.first)).getTime()}
  else {date_string = Date.now()}
 // console.log(date);
  console.log(date_string);
  let jsonObj = {'unix':date_string,'utc':new Date(date_string)};
  res.send(jsonObj);
  console.log(jsonObj);
});

app.get('/api/getTime/:first', (req, res) => {
 
  res.send(getUtcAndUnix(req.params.first));
  
});




const getUtcAndUnix = (date) => {
  let newDate = date ? new Date(date) : new Date()
  return{
    utc: newDate,
    unix: newDate.getTime()
  }
}

// console.log(getUtcAndUnix())
// console.log(getUtcAndUnix('5/1/2015'))