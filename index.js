// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204
// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
const moment  =  require('moment');
require('dotenv').config()

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


const isValid=(date)=>{
  return /^\d+$/.test(date);
}
app.get("/api/",(req,res)=>{
  let dateobject  =  new Date();
  let utc   = dateobject.toUTCString();
  let unix  = Math.floor(dateobject.getTime());
  unix      =  Number(unix);
  result  =  {
    unix    :  unix,
    utc    :  utc
  }
  res.json(result);
})
/**
 * 
 *     utc     = utc.format("ddd, DD MMM YYYY");
        utc     = `${utc} 00:00:00 GMT`;
 */


app.get("/api/:date", function (req, res) {
    let date  =  req.params.date;
    let result  = {}
    if(isValid(date)===true)
      date  =  Number(date);
    let dateobject  = new Date(date);
    let utc   =  dateobject.toUTCString();
    
    let unix  = Math.floor(dateobject.getTime());
    unix      =  Number(unix);
    if(isNaN(unix)===true)
      result  =  { error : "Invalid Date" };
    else{
      result  =  {
        unix    :  unix,
        utc    :  utc
      };
    }
    res.json(result);
});








// listen for requests :)
var listener = app.listen(process.env.PORT, function () {

  console.log(`http://localhost:${listener.address().port}`);
});
