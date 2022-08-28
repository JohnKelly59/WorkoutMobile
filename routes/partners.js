const path = require("path");
const express = require("express");
const router = express.Router();
const axios = require("axios").default;
const User = require("../models/User");

router.post("/findUser", async function (req, res) {
  let results = await User.find({ email: new RegExp(req.body.email, "i") });
  res.send(results);
});

router.post("/getPartners", async function (req, res) {
  let currentUser = req.body.email;
  let dbUser = await User.find({ email: currentUser });
  if (!dbUser) {
    res.status(404).send("no user found");
  }
  dbUser[0].getFriends(function (err, friends) {
    if (err) {
      res.status(200).send({ error: "no partners" });
      console.log("no friends");
    } else {
      res.send(friends);
    }
  });
});

router.post("/removePartner", async function (req, res) {
  let currentUser = req.body.email;
  let requestUser = req.body.partnerRemove;
  let dbUser = await User.find({ email: currentUser });
  let dbRequestUser = await User.find({ email: requestUser });

  dbUser[0].endFriendship(dbRequestUser[0], function (err, request) {
    if (err) {
      res.send({ error: err.message });
    } else {
      res.send(request);
    }
  });
});

router.post("/sendPartnerRequest", async function (req, res) {
  let currentUser = req.body.user;
  let requestUser = req.body.partner;
  console.log("partnerme: ", requestUser);
  let dbUser = await User.find({ email: currentUser });
  let dbRequestUser = await User.find({ email: requestUser });

  try {
    dbUser[0].friendRequest(dbRequestUser[0], function (err, request) {
      if (err) {
        res.send({ error: err.message });
      } else {
        res.send(request);
      }
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/getPartnerRequests", async function (req, res) {
  let currentUser = req.body.email;
  let dbUser = await User.find({ email: currentUser });

  dbUser[0].getRequests(function (err, request) {
    if (err) {
      res.send({ error: err.message });
    } else {
      res.send(request);
    }
  });
});

router.post("/acceptPartnerRequest", async function (req, res) {
  let currentUser = req.body.user;
  let requestUser = req.body.partner;
  console.log("postman: ", requestUser);
  let dbUser = await User.find({ email: currentUser });
  let dbRequestUser = await User.find({ email: requestUser });

  dbUser[0].acceptRequest(dbRequestUser[0], function (err, friendship) {
    if (err) {
      res.send({ error: err.message });
    } else {
      res.send(friendship);
    }
  });
});

router.post("/denyPartnerRequest", async function (req, res) {
  let currentUser = req.body.user;
  let requestUser = req.body.partner;
  let dbUser = await User.find({ email: currentUser });
  let dbRequestUser = await User.find({ email: requestUser });

  dbUser[0].denyRequest(dbRequestUser[0], function (err, denied) {
    if (err) {
      res.send({ error: err.message });
    } else {
      res.send(denied);
    }
  });
});

router.post("/cancelPartnerRequest", async function (req, res) {
  let currentUser = req.body.user;
  let requestUser = req.body.partner;
  let dbUser = await User.find({ email: currentUser });
  let dbRequestUser = await User.find({ email: requestUser });

  dbUser[0].cancelRequest(dbRequestUser[0], function (err, canceled) {
    if (err) {
      res.send({ error: err.message });
    } else {
      res.send(canceled);
    }
  });
});

module.exports = router;
