// server.js
// where your node app starts

// init project
require("dotenv").config();
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

const days=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
// your first API endpoint... 
app.get("/api/:word?/", function (req, res) {
  var str=req.params.word;
  console.log(str);
  if(str==null){
    str=new Date();
  }
  else if(str.includes('-')||str.includes(' ')){
    console.log("will remain as a str "+str);
  }
  else{
    str=parseInt(str);
  }
  if(new Date(str)=="Invalid Date"||typeof(str)=='undefined'){
    res.send({error:"Invalid Date"});
  }
  const strUni=new Date(str);
  const strUnix=strUni.getTime();
  var strDay=strUni.getDay();
  var month=strUni.getMonth();
  var strUtcDay=days[strDay]+", ";
  strUtcDay+=('0' + strUni.getDate()).slice(-2)+" ";
  strUtcDay+=months[month]+" ";
  strUtcDay+=strUni.getFullYear()+" ";
  strUtcDay+=('0' + strUni.getUTCHours()).slice(-2)+":";  
  strUtcDay+=('0' + strUni.getUTCMinutes()).slice(-2)+":"; 
  strUtcDay+=('0' + strUni.getUTCSeconds()).slice(-2)+" GMT";  
  res.send({unix : strUnix , utc:strUtcDay});
  
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
