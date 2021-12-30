const express = require("express");
const app = express();

app.use(express.json());

// so that your API is remotely testable by FCC
const cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("src/public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// Timestamp router
const timestampRouter = require("./routes/timestamp");
app.use("/api", timestampRouter);

// listen for requests :)
const listener = app.listen(3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

// Netlify Serverless Lamda Function
// const serverless = require("serverless-http");
// module.exports.handler = serverless(app);
