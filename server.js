// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
const moment=require('moment');

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

app.get("/api/:input",(req,res)=>{
  var inp=req.params.input;
  var testp1=new Date(inp).getTime();
  var testp2=new Date(parseInt(inp)).getTime();
  //if date
  if(testp1>0)
  {
  res.json({
    unix:moment(inp).unix()*1000,
    utc:new Date(inp).toUTCString()
  })
}
//if time stamp
else if(testp2>0)
{
   res.json({
    unix:moment(parseInt(inp)).unix()*1000,
    utc:new Date(parseInt(inp)).toUTCString()
  })
}
//invalid
else{
  res.json({
    error:"invalid date"
  });
}
});

app.get("/api",(req,res)=>{
  res.json({
    unix:moment().unix()*1000,
    utc:new Date().toUTCString()
  })
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
