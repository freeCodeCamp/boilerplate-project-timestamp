const express = require("express");
const router = express.Router();

// Getting All
router.get("/", (req, res) => {
  res.send("Hello World");
});

// Getting One
router.get("/:id", (req, res) => {
  res.send(req.params.id);
});

// Creating One
router.post("/", (req, res) => {});

// Updating One
router.patch("/:", (req, res) => {});

// Deleting One
router.delete("/:id", (req, res) => {});

module.exports = router;
