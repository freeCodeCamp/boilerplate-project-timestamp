const express = require("express");
const app = express();

app.use(express.json());

// so that your API is remotely testable by FCC
const cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// Timestamp router
const timestampRouter = express.Router();

timestampRouter.get("/:date", (req, res) => {
  const regex = /-/;
  let date = regex.test(req.params.date)
    ? req.params.date
    : Number(req.params.date);

  date = new Date(date);

  const dateObject = {
    unix: date.getTime(),
    utc: date.toUTCString(),
  };

  res.json(dateObject);
});

app.use("/api", timestampRouter);

// listen for requests :)
// const listener = app.listen(3000, () => {
//   console.log("Your app is listening on port " + listener.address().port);
// });

// Netlify Serverless Lamda Function
const serverless = require("serverless-http");
module.exports.handler = serverless(app);
