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

app.get("/api/", (req, res) => {
	const utcDate = new Date().toUTCString();
	const unix = Date.parse(utcDate);
	res.json({ unix: unix, utc: utcDate });
});

app.get("/api/:date?", function (req, res) {
	let unix;
	let utcDate;
	const dateString = req.params.date;
	const isOnlyNumbers = /^[0-9]+$/.test(dateString);
	if (isOnlyNumbers) {
		unix = parseInt(dateString);
		utcDate = new Date(unix).toUTCString();

		res.json({ unix: unix, utc: utcDate });
	} else {
		unix = Date.parse(dateString);
		utcDate = new Date(unix).toUTCString();

		unix
			? res.json({ unix: unix, utc: utcDate })
			: res.json({ error: "Invalid Date" });
	}
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
