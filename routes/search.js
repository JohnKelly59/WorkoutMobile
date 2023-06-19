const express = require("express");
const router = express.Router();
const axios = require("axios").default;
const Favorite = require("../models/Favorites");
const Daily = require("../models/Daily");
const Workouts = require("../models/Workouts");

router.post("/search", function (req, res) {
  // Initialize the workout array
  const workout = [];

  // Retrieve front-end data
  const { bodyPart, equipment, target } = req.body;

  // Check if at least one filter is provided
  if (!bodyPart && !equipment && !target) {
    return res.status(400).send({ error: 'At least one of "bodyPart", "equipment", or "target" must be provided.' });
  }

  // Build the filter object dynamically
  const filter = {};
  if (bodyPart) filter.bodyPart = bodyPart;
  if (equipment) filter.equipment = equipment;
  if (target) filter.target = target;

  // Query the workouts collection
  Workouts.find(filter)
    .then(function (response) {
      // Log the data retrieved from the database
      console.log(response);

      // Add the response to the workout array
      workout.push(...response);

      // Send the workout array as the response
      res.send(workout);
    })
    .catch(function (error) {
      console.error(error);
      res.status(500).send(error);
    });
});

router.post("/workoutsearch", async function (req, res) {
  let results = await Workouts.find({ target: req.body.target });
  res.send(results);
});

router.post("/exerciseCards", async function (req, res) {
  let exercises = req.body.chosenExercises;
  let results = await Promise.all(
    exercises.map(async (exercise) => {
      let dbData = await Workouts.find({ name: exercise.name });
      return dbData;
    })
  );
  let allResults = results.flat(1);
  res.send(allResults);
});

module.exports = router;
