const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/api/:date?', (req, res) => {
    let dateParam = req.params.date;
    let date;

    if (!dateParam) {
        // If no date is provided, use the current date
        date = new Date();
    } else if (!isNaN(dateParam)) {
        // If the date is a number, parse it as a Unix timestamp
        date = new Date(parseInt(dateParam));
    } else {
        // Otherwise, parse it as an ISO-8601 date
        date = new Date(dateParam);
    }

    if (date.toString() === 'Invalid Date') {
        res.json({ error: 'Invalid Date' });
    } else {
        const unix = date.getTime();
        const utc = date.toUTCString();
        res.json({ unix, utc });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
