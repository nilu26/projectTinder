const express = require("express");
const mongoose = require("mongoose");

const { userAuth } = require("../middlewares/auth");
const connectionRequestModel = require("../models/connectionRequest");
const user = require("../models/user");

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

userRouter.get('/user/feed', userAuth, async (req, res) => {
    try {
        const loggedUser = req.user;
        const allUsers = await user.find({})

        const connectionModel = await connectionRequestModel.find({
            $or: [
                {toUserId: loggedUser._id},
                {fromUserId: loggedUser._id}
            ]
        })

        const filteredData = await allUsers.filter(data => {
            if(data._id.toString() === loggedUser._id.toString()) return false;

            const isConnected = connectionModel.some(values => {
                return (values.fromUserId.toString() === data._id.toString() || 
                values.toUserId.toString() === data._id.toString())
            })
            return !isConnected;
        })

        console.log(filteredData)

        res.json({
            count: filteredData.length,
            data: filteredData
        })

    } catch(err) {
        res.status(400).send("userRouterError: " + err.message)
    }
})

module.exports = {
  userRouter,
};
