const express = require("express");
const Favorite = require("../models/Favorites");
const FavoriteWorkouts = require("../models/FavoriteWorkouts");
const router = express.Router();
const { ensureAuthInfo } = require("../middleware/auth");
const mongoose = require("mongoose");
const axios = require("axios").default;
const Workouts = require("../models/Workouts");

router.post("/favorites", async function (req, res) {
  // get username
  // get user id
  let email = req.body.email;
  // hold favorite data in array
  try {
    // get saved favorites from database
    const favData = await Favorite.find({ UserEmail: email });
    //check if db is empty
    if (favData.length == 0) {
      console.log("No record found");
      res.send([]);
    } else {
      const favWorkouts = [];

      for (i = 0; i < favData.length; i++) {
        let workout = await Workouts.find({ id: favData[i].id });
        favWorkouts.push(workout[0]);
      }

      res.send(favWorkouts);
    }
  } catch (e) {
    res.send(e);
  }
});

router.post("/addFavorites", async function (req, res) {
  //get favorite button value
  // get value of card of button that was pressed;
  try {
    //add card id to favorites db
    const newFavorite = {
      id: req.body.id,

      UserEmail: req.body.email,
    };
    //redirect favorite
    await Favorite.create(newFavorite);
    res.status(200).send("Success");
  } catch (err) {
    console.error(err);
  }
});

router.post("/removeFavorites", async function (req, res) {
  try {
    // delete favorite exercise from favorite db
    const deletion = await Favorite.deleteOne({
      userEmail: req.body.email,
      id: req.body.id,
    });
    res.send(deletion);
  } catch (e) {
    console.error(e);
  }
});

router.post("/favoriteWorkouts", async function (req, res) {
  // get username
  // get user id
  let email = req.body.email;
  // hold favorite data in array
  try {
    // get saved favorites from database
    const favData = await FavoriteWorkouts.find({ UserEmail: email });
    //check if db is empty
    if (favData.length == 0) {
      console.log("No record found");
      res.send([]);
    } else {
      res.send(favData);
    }
  } catch (e) {
    res.send(e);
  }
});

router.post("/addFavoriteWorkout", async function (req, res) {
  //get favorite button value
  // get value of card of button that was pressed;

  try {
    //add card id to favorites db
    const newFavoriteWorkout = {
      id: req.body.id,
      UserEmail: req.body.email,
      title: req.body.title,
      exercises: req.body.exercises,
      time: req.body.time,
    };
    //redirect favorite
    await FavoriteWorkouts.create(newFavoriteWorkout);
    res.status(200).send("Success");
  } catch (err) {
    console.error(err);
  }
});

router.post("/removeFavoriteWorokut", async function (req, res) {
  try {
    // delete favorite exercise from favorite db
    const deletion = await FavoriteWorkouts.deleteOne({
      userEmail: req.body.email,
      title: req.body.title,
    });
    res.send(deletion);
  } catch (e) {
    console.error(e);
  }
});

router.post("/favoriteWorkoutExerciseCards", async function (req, res) {
  let exercises = req.body.exercises;
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
