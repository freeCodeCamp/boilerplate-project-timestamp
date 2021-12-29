const express = require("express");
const router = express.Router(); // <-- Research More!
const Subscriber = require("../models/subscriber");

// research "next" and "done"

// --------- PRACTICE DIFFERENT FORMS OF ASYNC FUNCTIONS HERE --------- //

// Getting All (Using Async / Await)
router.get("/async", async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    res.json(subscribers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting All (Using Callback Function)
router.get("/callback", (req, res) => {
  Subscriber.find({}, (err, people) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(people);
  });
});

// Getting One
router.get("/:id", (req, res) => {
  res.send(req.params.id);
});

// Creating One (Async)
router.post("/", async (req, res) => {
  const subscriber = new Subscriber({
    name: req.body.name,
    subscribedToChannel: req.body.subscribedToChannel,
  });
  try {
    const newSubscriber = await subscriber.save();
    res.status(201).json(newSubscriber);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Creating One (Promise)
router.post("/promise", (req, res) => {
  const subscriber = new Subscriber({
    name: req.body.name,
    subscribedToChannel: req.body.subscribedToChannel,
  });
  subscriber
    .save()
    .then(() => {
      res.status(201).json(subscriber);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
});

// Creating Many (Async)
router.post("/async", async (req, res) => {
  const subscriberArray = [
    {
      name: "Snoop Dogg",
      subscribedToChannel: "NerdWriter",
    },
    {
      name: "Ana de Armas",
      subscribedToChannel: "Pewdiepie",
    },
  ];
  try {
    Subscriber.create(subscriberArray);
    res.status(201).json(subscriberArray);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Updating One
router.patch("/:", (req, res) => {});

// Deleting One
router.delete("/:id", (req, res) => {});

module.exports = router; // <-- imports into server.js as 'subscribersRouter to be used as middleware
