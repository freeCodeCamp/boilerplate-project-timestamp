// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", (req, res) => {
  res.send({ Unix: "hello API" });
});

//first endpoint url
app.get("/api/:dateString", (req, res) => {
  const dateObject = req.params.dateString;
  res.json({
    unix: req.params.dateString,
    utc: new Date().toUTCString(),
  });
});

// const tunix = Date.now();
// const dateObject = new Date();

// console.log(dateObject.toUTCString());

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
