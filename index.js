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

const validate  =  ({unix,utc})=>{
  console.log("Testing date ",utc);
  try {
    let ud  =  new Date(unix);
    let uxd  =  new Date(utc);
  } catch (error) {
    console.log("Invalid",d);
  }
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


app.get("/api/:date", function (req, res) {
    let date  =  req.params.date;
    let result  = {}


    console.log(date);
     if(date.includes('-')){
      try {
        let dateobject    = new Date(date);
        let utc   = dateobject.toUTCString();
        let unix  = Math.floor(dateobject.getTime());
        if(utc==="Invalid Date") throw Error("Invalid Date")
        result  = {
          unix:Number(unix),
          utc:utc
        }
        validate(result);
      } catch (error) {
        result  = { error : "Invalid Date" }
      }
    }else{
      try {
        date  = Number(date);
        
        let utc = moment(date).utc();
        utc     = utc.format("ddd, DD MMM YYYY");
        utc     = `${utc} 00:00:00 GMT`;
        result  = {
           unix :Number(date),
           utc: utc
        }
        validate(result)
      } catch (error) {
        console.log(error)
        result= { error : "Invalid Date" }
      }
    }
  res.json(result);
});









// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log(`http://localhost:${listener.address().port}`);
});
