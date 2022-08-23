const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const router = express.Router();
const ProfilePics = require("../models/ProfilePics");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const User = require("../models/User");

const conn = mongoose.createConnection(process.env.MONGO_URI);

// Init gfs
let gfs;

conn.once("open", () => {
  // Init stream

  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "profilepics",
  });
});

const storage = new GridFsStorage({
  url: process.env.MONGO_URI,
  file: (req, file) => {
    return {
      filename: file.originalname + "_profile",
      id: file.originalname,
      bucketName: "profilepics",
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
  res.status(200).send("success");
});

router.post("/deleteProfilePic", (req, res) => {
  console.log("why:", req.body.userid);
  gfs.delete(req.body.userid).then((result, err) => {
    if (err) {
      console.log("error", err);
    } else {
      res.status(200).send(result);
    }
  });
});

router.get("/profilePic/:userid", async function (req, res) {
  if (!req.params.userid || req.params.userid === "undefined")
    return res.status(400).send("no image id");
  const _id = new mongoose.Types.ObjectId(req.params.userid);
  gfs
    .find({ filename: req.params.userid + "_profile" })
    .toArray((err, files) => {
      if (!files || files.length === 0) {
        console.log(req.params.userid);
        return res.status(400).send("no files exist");
      }
      gfs.openDownloadStream(req.params.userid).pipe(res);
    });
});

module.exports = router;
