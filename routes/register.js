const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const User = require("../models/User");
//checks to see if user is logged in
const { ensureAuth } = require("../middleware/auth");

router.post("/register", async function (req, res, done) {
  // retrieves name and email from user
  const name = req.body.name;
  const email = req.body.email;

  if (name === null || email === null || req.body.password === null) {
    res.status(400).send("No data");
  } else {
    try {
      // retrieves password and hashes it
      const hashPassword = await bcrypt.hash(req.body.password, 10);
      // creats new user model from retrieved data
      const newNormalUser = {
        firstName: name,
        email: email.toLowerCase(),
        password: hashPassword,
      };
      //looks through database to make sure the emial hasn't been used
      let user = await User.findOne({ email: email });
      if (user) {
        done(null, user, { message: "User with that email already exist" });
        res.render("register", {
          message: "User with that email already exist",
        });
      } else {
        //creates new user
        user = await User.create(newNormalUser);
        done(null, user);
        res.status(200).send(user);
      }
    } catch (err) {
      console.error(err);
      res.status(400).send({
        message: err,
      });
    }
  }
});

router.post("/deleteUser", async function (req, res, done) {
  const email = req.body.email;
  if (email === null) {
    res.status(400).send("No data");
  } else {
    try {
      let user = await User.findOneAndDelete({ email: email });
      if (user) {
        done(null, user, { message: "User Deleted" });
        res.status(200).send("Success");
      } else {
        //creates new user
        console.log("user was not deleted");
      }
    } catch (err) {
      console.error(err);
      res.status(400).send({
        message: err,
      });
    }
  }
});

module.exports = router;
