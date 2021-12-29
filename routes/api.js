const express = require("express");
const router = express.Router();

// processes strings, but not numbers
// regex validation needed

router.get("/:date", (req, res) => {
  const date = new Date(req.params.date);

  const dateObject = {
    unix: date.getTime(),
    utc: date.toUTCString(),
  };

  res.json(dateObject);
});

module.exports = router;
