const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static('public'));

app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/hello", (req, res) => {
  res.json({ greeting: 'hello API' });
});

app.get("/api/current_time", (req, res) => {
  const timeInMs = Date.now();
  const timeUTC = new Date().toUTCString();
  res.json({
    unix: timeInMs,
    utc: timeUTC,
  });
});

app.get("/api/:date_string", (req, res) => {
  try {
    let dateParam = req.params.date_string;
    let date;

    if (!dateParam) throw new Error("Date parameter is missing");

    if (!isNaN(dateParam)) {
      date = new Date(parseInt(dateParam));
    } else {
      date = new Date(dateParam);
    }

    if (isNaN(date.getTime())) {
      throw new Error("Invalid Date");
    }

    res.json({
      unix: date.getTime(),
      utc: date.toUTCString(),
    });
  } catch (error) {
    res.json({ error: error.message });
  }
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
