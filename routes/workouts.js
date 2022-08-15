const express = require("express");
const FavoriteWorkouts = require("../models/FavoriteWorkouts");
const router = express.Router();
const { ensureAuthInfo } = require("../middleware/auth");
const mongoose = require("mongoose");
const axios = require("axios").default;
const Workouts = require("../models/Workouts");

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
      partnerEmails: [],
    };
    //redirect favorite
    await FavoriteWorkouts.create(newFavoriteWorkout);
    res.status(200).send("Success");
  } catch (err) {
    console.error(err);
  }
});

router.post("/removeFavoriteWorkout", async function (req, res) {
  console.log("here:", req.body);
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

//--------------------------------------------------------------------------------------

router.post("/sharedWorkouts", async function (req, res) {
  let email = req.body.user;
  console.log("email: ", email);
  try {
    const sharedWorkoutData = await FavoriteWorkouts.find({
      partnerEmails: email,
    });

    if (sharedWorkoutData.length == 0) {
      console.log("No record found");
      res.send([]);
    } else {
      console.log("datareturnhere: ", sharedWorkoutData);
      res.send(sharedWorkoutData);
    }
  } catch (e) {
    res.send(e);
  }
});

router.post("/addSharedWorkout", async function (req, res) {
  let user = req.body.user;
  let workout = req.body.workout;
  let partner = req.body.partner;
  let partnersAndYou = partner.push(user);
  console.log("user: ", user, "workout: ", workout, "partner: ", partner);
  try {
    //redirect favorite
    const addPartner = await partner.map(async (x) => {
      await FavoriteWorkouts.findOneAndUpdate(
        { UserEmail: user, id: workout },
        { $push: { partnerEmails: x } }
      );
      return "done";
    });
    console.log(addPartner);
    res.status(200).send("Success");
  } catch (err) {
    console.error(err);
  }
});

router.post("/removeSharedWorkout", async function (req, res) {
  let user = req.body.user;
  let workout = req.body.workout;
  try {
    //redirect favorite
    const removePartner = await partner.map((x) => {
      return FavoriteWorkouts.findOneAndUpdate(
        { id: workout },
        { $pop: { partnerEmails: user } }
      );
    });
    console.log(removePartner);
    res.status(200).send("Success");
  } catch (err) {
    console.error(err);
  }
});

router.post("/sharedWorkoutExerciseCards", async function (req, res) {
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

router.post("/removePartners", async function (req, res) {
  let array = req.body.array;
  let workout = "1658037176405";
  let user = "batboy.john91@gmail.com";
  try {
    //redirect favorite
    const restart = await FavoriteWorkouts.updateMany(
      {},
      { partnerEmails: array }
    );
    console.log(restart);
    res.status(200).send("Success");
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
