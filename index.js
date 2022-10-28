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
let myObject = {};
app.get("/api/:date_string",  (req, res) => {
  let date = req.params.date_string;
    if (date.includes('-'))  {

  myObject['unix'] = new Date(date).getTime(); 
  myObject['utc'] = new Date(date).toUTCString();


    
    } else {
      date = parseInt(date);
    
        myObject['unix'] = date;
        myObject['utc'] = new Date(date).toUTCString();
        
    };

       if (!myObject["unix"] || !myObject["utc"]) {
          res.json(
            {
               "error": "Invalid Date"
            }
          );
        } 
       res.json(myObject);
  });


      app.get('/api', (req, res) => {
          res.json(
            {
              "unix": new Date().getTime(),
              "utc": new Date().toUTCString(),
            }
          );
    });



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
