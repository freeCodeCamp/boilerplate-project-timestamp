// server.js
// where your node app starts

// init project
const express = require("express");
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require("cors");
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/timestamp/:date", (req, res) => {
  const input = req.params.date;

  const validFormat = date => {
    const format = /^\d{1,2}\-\d{1,2}\-\d{4}$/.test(date);
    const simbols = date.match(/\D/g);
    return !!simbols
      ? simbols.length == 2
        ? !simbols.some(s => s !== "-")
          ? format
            ? new Date(date)
            : false
          : false
        : false
      : new Date(date * 1000);
  };

  if (!!validFormat(input)) {
    const unix = validFormat(input).getTime();
    const utc = validFormat(input).toUTCString();
    res.send({ unix, utc });
  } else {
    res.send({ error: "Invalid Date" });
  }
});

const port = process.env.PORT || 3000;
// listen for requests :)
const listener = app.listen(port, () =>
  console.log("Your app is listening on port " + listener.address().port)
);
