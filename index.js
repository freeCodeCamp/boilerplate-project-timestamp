// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
const moment  =  require('moment');

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

const validate  =  (date)=>{
  console.log("Testing date ",date);
  try {
    let d=new Date(date);
    if(d){
      console.log("valid ",d);
      // console.log()
    }
  } catch (error) {
    console.log("Invalid",d);
  }
}

app.get("/api/:date", function (req, res) {
  let date  =  req.params.date;
  
  let result  =  {}
  if(date.includes('-')){
    let isValid  =  moment(date, "YYYY-MM-DD").isValid();
   if(isValid){
      let unix = moment(date,"YYYY-MM-DD").unix();
      let utc  =  moment(date).utc().format("ddd, DD MMM YYYY 00:00:00")+" GMT";

      validate(unix);
      validate(utc);
      result  =  {
        "unix"  :  unix,
        "utc"   :  utc
      }
   }else{
      result  =  { error : "Invalid Date" }

   }
  }else{
     try {
       let unixDate =  moment(parseInt(date)).format('YYYY-MM-DD');
      let utc  =  moment(unixDate).utc().format("ddd, DD MMMM YYYY 00:00:00")+" GMT";
      validate(utc) ;
       
       result  =  {
          unix:date,
          utc:utc
        }
       
     } catch (error) {
       console.log(error)
       result  =  { error : "Invalid Date" }
     }
  }
  res.json(result);
});





// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
