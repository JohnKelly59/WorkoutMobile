const express = require("express");
const router = express.Router();
const axios = require("axios").default;
const Favorite = require("../models/Favorites");
const Daily = require("../models/Daily");
const Workouts = require("../models/Workouts");

router.post("/search", function (req, res) {
  const { bodyPart, equipment, target } = req.body;

  Workouts.find({})
    .then(function (response) {
      let result;

      if (equipment === "" && target === "" && bodyPart === "") {
        // Push whole dataset into the array if no filters are specified.
        result = [response];
      } else {
        // Apply filters and then push into an array.
        result = [response.filter((exercise) => {
          let matchesEquipment = equipment === "" || exercise.equipment === equipment;
          let matchesTarget = target === "" || exercise.target === target;
          let matchesBodyPart = bodyPart === "" || exercise.bodyPart === bodyPart;
          return matchesEquipment && matchesTarget && matchesBodyPart;
        })];
      }

      res.send(result);
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
