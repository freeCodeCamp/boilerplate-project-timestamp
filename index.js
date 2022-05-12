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
app.get("/api/hello", function (req, res) {
  res.json({ greeting: req.params.hello });
});

app.get("/api/:stamp", (req, res) => {
  const stamp = req.params.stamp;
  if (isNaN(stamp)) {
    if (new Date(stamp).toUTCString() === "Invalid Date") {
      res.json({ error: "Invalid Date" });
    } else {
      res.json({
        unix: new Date(stamp).getTime(),
        utc: new Date(stamp).toUTCString(),
      });
    }
  } else {
    if (new Date(parseInt(stamp)).toUTCString() === "Invalid Date") {
      res.json({ error: "Invalid Date" });
    } else {
      res.json({
        unix: parseInt(stamp),
        utc: new Date(parseInt(stamp)).toUTCString(),
    });
    }
  }
  // try {
  //   if (isNaN(req.params.stamp)) {
  //     stamp = parseInt(req.params.stamp);
  //     res.json({ unix: stamp, utc: new Date(stamp).toUTCString() });
  //   }
  // } catch (err) {
  //   console.log(err);
  // }
});

// listen for requests :)
// var listener = app.listen(process.env.PORT, function () {
//   console.log('Your app is listening on port ' + listener.address().port);
// });

app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port 3000");
});
