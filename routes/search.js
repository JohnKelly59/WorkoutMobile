const express = require("express");
const router = express.Router();
const axios = require("axios").default;
const Favorite = require("../models/Favorites");
const Daily = require("../models/Daily");
const Workouts = require("../models/Workouts");

//array to hold data from api call
var workout = [];

router.post("/search", async (req, res) => {
  const { bodyPart, equipment, targetMuscle } = req.body;

  try {
    let workouts = await Workouts.find({});
    
    workouts = workouts.filter((workout) => {
      return (
        (!bodyPart || workout.bodyPart === bodyPart) &&
        (!equipment || workout.equipment === equipment) &&
        (!targetMuscle || workout.target === targetMuscle)
      );
    });

    res.send(workouts);
  } catch (error) {
    console.error(error);
    res.send(error);
  }
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
