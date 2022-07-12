const path = require("path");
const express = require("express");
const router = express.Router();
const axios = require("axios").default;
const Workouts = require("../models/Workouts");

//array that holds selected data from api call
var rworkout = [];
//randomizer route

router.post("/random", function (req, res) {
  //erases array that holds data retrieved from api
  rworkout = [];
  //gets input data from forms
  const bodyPart = req.body.bodyPart;
  const number = req.body.exercises;
  //api options
  Workouts.find({})
    //success request
    .then(function (response) {
      const json = response;

      //result array to hold filtered data api
      let result = [];
      //statements to deteremine what data to filter
      if (bodyPart === "arms") {
        result = json.filter(
          (exercise) =>
            exercise.bodyPart === "lower arms" ||
            exercise.bodyPart === "upper arms"
        );
      } else if (bodyPart === "legs") {
        result = json.filter(
          (exercise) =>
            exercise.bodyPart === "lower legs" ||
            exercise.bodyPart === "upper legs"
        );
      } else if (bodyPart === "shoulders") {
        result = json.filter(
          (exercise) =>
            exercise.bodyPart === "shoulders" || exercise.bodyPart === "neck"
        );
      } else {
        result = json.filter((exercise) => exercise.bodyPart === bodyPart);
      }
      //push result array to rworkout array
      rworkout.push(result);
      // Shuffle array
      const shuffled = result.sort(() => 0.5 - Math.random());

      rworkout = shuffled.slice(0, parseInt(number));
      res.send(rworkout);
    })
    //catch errors
    .catch(function (error) {
      console.error(error);
    });
});

router.get("/migrate", async function (req, res) {
  //erases array that holds data retrieved from api
  console.log("migrate");

  //api options
  var options = {
    method: "GET",
    url: "https://exercisedb.p.rapidapi.com/exercises",
    headers: {
      "x-rapidapi-host": "exercisedb.p.rapidapi.com",
      "x-rapidapi-key": process.env.MY_KEY,
    },
  };
  try {
    Promise.all(
      axios.request(options).then((response) => {
        response.data.map((mineNow) => {
          console.log("1");
          let newWorkout = {
            bodyPart: mineNow.bodyPart,
            equipment: mineNow.equipment,
            gifUrl: mineNow.gifUrl,
            id: mineNow.id,
            name: mineNow.name,
            target: mineNow.target,
          };
          Workouts.create(newWorkout);
        });
      })
    );
    res.status(200).send("success");
  } catch (e) {
    console.error(e);
  }
});

module.exports = router;
