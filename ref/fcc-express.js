// var express = require('express');
// var bodyParser = require('body-parser');
// var app = express();

app.use("/", (req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

app.use("/public", express.static(__dirname + "/public"));

app.use("/name", bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  absolutePath = __dirname + "/views/index.html";
  res.sendFile(absolutePath);
});

app.get("/json", (req, res) => {
  if (process.env.MESSAGE_STYLE === "uppercase") {
    res.json({ message: "Hello json".toUpperCase() });
  } else {
    res.json({ message: "Hello json" });
  }
});

app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.json({ time: req.time });
  }
);

app.get("/:word/echo", (req, res) => {
  res.json({ echo: req.params.word });
});

app
  .route("/name")
  .get((req, res) => {
    res.json({ name: `${req.query.first} ${req.query.last}` });
  })
  .post((req, res) => {
    console.log(req.body);
    res.json({ name: `${req.body.first} ${req.body.last}` });
  });

//  module.exports = app;
