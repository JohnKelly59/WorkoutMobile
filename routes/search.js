const express = require("express");
const router = express.Router();
const axios = require("axios").default;
const Favorite = require("../models/Favorites");
const Daily = require("../models/Daily");
const Workouts = require("../models/Workouts");

//array to hold data from api call
var workout = [];

router.post("/search", function (req, res) {
  // Retrieve front-end data
  const { bodyPart, equipment, target } = req.body;

  // API options
  Workouts.find({})
    .then(function (response) {
      // Filter the response data based on the conditions and push it directly into workout
      workout.push(response.filter(exercise => {
        return (bodyPart === "" || exercise.bodyPart === bodyPart) &&
               (equipment === "" || exercise.equipment === equipment) &&
               (target === "" || exercise.target === target);
      }));

      res.send(workout);
    })
    .catch(function (error) {
      console.error(error);
      res.send(error);
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
