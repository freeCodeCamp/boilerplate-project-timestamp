var express = require('express');
const PORT = process.env.PORT || 3000
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204


app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Api endpoints
app.get('/api', (req, res)=>{
  res.json({
    unix: new Date().getTime(),
    utc: new Date().toUTCString()
  })
})

app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/:timestamp', (req, res)=>{
  let {timestamp} = req.params
  if(!isNaN(Number(timestamp)) && timestamp.length === 13){
    return res.json({
      unix: timestamp,
      utc: new Date(Number(timestamp)).toUTCString()
    })
  }

  if(new Date(timestamp).toUTCString() !== 'Invalid Date'){
    return res.json({
      unix: new Date(timestamp).getTime(),
      utc: timestamp
    })
  }

  res.json({ error : "Invalid Date" })
})


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
