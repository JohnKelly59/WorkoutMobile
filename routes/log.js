const express = require("express");
const Logs = require("../models/Logs");
const router = express.Router();
const { ensureAuthInfo } = require("../middleware/auth");
const mongoose = require("mongoose");
const axios = require("axios").default;

router.post("/log", async function (req, res) {
  let email = req.body.email;
  const LogData = await Logs.find({ email: email });
  if (LogData.length != 0) {
    res.send(LogData);
  } else {
    res.send(LogData);
  }
});

router.get("/", async function (req, res) {
  res.status(200).send("Success");
});

router.post("/addLog", async function (req, res) {
  // retrieves name and email from user
  let title = req.body.title;
  let desc = req.body.desc;
  let email = req.body.email;
  let time = req.body.time;
  let id = req.body.id;
  try {
    const newLog = {
      id,
      title,
      desc,
      email,
      time,
    };
    //creates new log
    await Logs.create(newLog);
    res.status(200).send("Success");
  } catch (err) {
    console.error(err);
  }
});

router.post("/removeLog", async function (req, res) {
  // get user id
  let email = req.body.email;
  let id = req.body.id;
  try {
    // delete favorite exercise from favorite db
    let deleted = await Logs.deleteOne({ email: email, id: id });
    res.status(200).send(deleted);
  } catch (err) {
    console.error(err);
  }
});

router.post("/editLog", async function (req, res) {
  // retrieves name and email from user
  let title = req.body.title;
  let desc = req.body.desc;
  let email = req.body.email;
  let id = req.body.id;
  try {
    const filter = {
      email: email,
      id: id,
    };
    const update = {
      title: title,
      desc: desc,
    };

    //creates new log
    let updated = await Logs.findOneAndUpdate(filter, update);
    res.status(200).send(updated);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
