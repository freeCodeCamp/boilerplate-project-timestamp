const express = require("express");
const serverless = require("serverless-http");
const app = express();

app.use(express.json());

// so that your API is remotely testable by FCC
const cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// API router
const timestampRouter = require("../routes/timestamp");
app.use("/api", timestampRouter);

module.exports.handler = serverless(app);
