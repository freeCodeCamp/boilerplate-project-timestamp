const express = require("express");
const router = express.Router();

router.get("/:date", (req, res) => {
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

module.exports = router;
