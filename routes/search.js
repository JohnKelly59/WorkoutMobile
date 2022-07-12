const express = require("express");
const router = express.Router();
const axios = require("axios").default;
const Favorite = require("../models/Favorites");
const Daily = require("../models/Daily");
const Workouts = require("../models/Workouts");

//array to hold data from api call
var workout = [];

router.post("/search", function (req, res) {
  //erases array that holds data retrieved from api
  workout = [];
  //reteives front-end data
  const bodyPart = req.body.bodyPart;
  const equipment = req.body.equipment;
  const target = req.body.targetMuscle;
  // api options
  Workouts.find({})
    .then(function (response) {
      // logging data retrieved from api
      const json = response;
      // logging all data retrieved from front-end

      let result = [];
      //statements to deteremine what data to filter
      if (equipment === "" && target === "" && bodyPart === "") {
        //push data to array
        workout.push(json);
      } else if (bodyPart === "" && target === "") {
        result = json.filter((exercise) => exercise.equipment === equipment);
      } else if (equipment === "" && bodyPart === "") {
        result = json.filter((exercise) => exercise.target === target);
      } else if (equipment === "" && target === "") {
        result = json.filter((exercise) => exercise.bodyPart === bodyPart);
      } else if (bodyPart === "") {
        result = json.filter(
          (exercise) =>
            exercise.target === target && exercise.equipment === equipment
        );
      } else if (target === "") {
        result = json.filter(
          (exercise) =>
            exercise.bodyPart === bodyPart && exercise.equipment === equipment
        );
      } else if (equipment === "") {
        result = json.filter(
          (exercise) =>
            exercise.bodyPart === bodyPart && exercise.target === target
        );
      } else if (equipment != "" && target != "" && bodyPart != "") {
        result = json.filter(
          (exercise) =>
            exercise.target === target &&
            exercise.equipment === equipment &&
            exercise.bodyPart === bodyPart
        );
      }
      workout.push(result);
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
