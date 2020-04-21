// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionSuccessStatus: 200 }));

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.route("/")
  .get(function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.route("/api/hello")
  .get(function(req, res) {
  res.json({ greeting: "hello API" });
});

const PORT = process.env.PORT || 3000;

// listen for requests
app.listen(PORT, function() {
  console.log("Your app is listening on port: " + PORT);
});
