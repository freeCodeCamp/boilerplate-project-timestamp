const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve the index.html from the 'views' directory
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Handle the API requests
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
