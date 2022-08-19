const express = require("express");
const passport = require("passport");
const router = express.Router();
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const ProfilePic = require("../models/ProfilePic");

const storage = new GridFsStorage({
  url: process.env.MONGO_URI,
  file: (req, file) => {
    return {
      filename: "file_" + Date.now(),
      id: req.body.name,
      index,
      bucketName: profilePics,
    };
  },
});

const uploads = multer({ storage });

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

router.post("/uploadPic", uploads.single("avatar"), async function (req, res) {
  console.log("pic: ", req.file);
});

module.exports = router;
