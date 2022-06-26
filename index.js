// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
const {days,months} = require('./util/time');

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


app.get("/api/:date?",function(req,res){
  // console.log(req.params.date);
 if(!isNaN(new Date(req.params.date))){
  let utc = new Date(req.params.date).toUTCString();
  let date = new Date(req.params.date);
let unix = Math.floor(date.getTime());
res.send({"unix" : Number(unix),"utc":utc});

    }else if(!isNaN(new Date(Number(req.params.date)))){
  let date= new Date(Number(req.params.date)).toUTCString();
    res.send({unix:Number(req.params.date),utc:date});
    // console.log(utc);
    }else if(typeof req.params.date == "undefined"){
      res.send({unix : Date.now(),utc : new Date(Date.now()).toUTCString()})
    }else{

    res.send({ error : "Invalid Date" });
    }
})


// listen for requests :)
var listener =app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
