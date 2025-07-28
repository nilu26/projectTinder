const express = require("express");
const mongoose = require("mongoose");

const { userAuth } = require("../middlewares/auth");
const connectionRequestModel = require("../models/connectionRequest");

const userRouter = express.Router();

const USER_DATA = [
  "firstName",
  "lastName",
  "gender",
  "age",
  "about",
  "photoUrl",
];

userRouter.get("/user/request/received", userAuth, async (req, res) => {
  try {
    const loggedUser = req.user;

    const receivedRequestData = await connectionRequestModel
      .find({
        toUserId: loggedUser._id,
        status: "interested",
      })
      .populate("fromUserId", [
        "firstName",
        "lastName",
        "age",
        "gender",
        "about",
        "profileUrl",
      ]);

    if (!receivedRequestData.length > 0) {
      return res.status(400).json({
        message: "No request found",
      });
    }

    res.send(receivedRequestData);
  } catch (err) {
    res.status(400).send("userRouterError: " + err.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedUser = req.user;

    const acceptedUsers = await connectionRequestModel
      .find({
        $or: [
          { toUserId: loggedUser._id, status: "accepted" },
          { fromUserId: loggedUser._id, status: "accepted" },
        ],
      })
      .populate("fromUserId", USER_DATA)
      .populate("toUserId", USER_DATA);

    if (!acceptedUsers.length > 0) {
      return res.status(400).send("No Connections found");
    }

    const mappedData = acceptedUsers.map((data) => {
        if(data.fromUserId._id.toString() === loggedUser._id.toString()) {
            return data.toUserId;
        }
        return data.fromUserId
    })

    res.send(mappedData);
  } catch (err) {
    res.status(400).send("userRouterError: " + err.message);
  }
});



module.exports = {
  userRouter,
};
