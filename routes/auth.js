const express = require("express");
const passport = require("passport");
const router = express.Router();
// Auth with Google

// /auth/login
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (user === null) throw err;
    if (err) throw err;
    if (!user) res.send("No User Exists");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send({ userData: user });
      });
    }
  })(req, res, next);
});

module.exports = router;
