const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequestModel = require("../models/connectionRequest");
const User = require("../models/user");

requestRouter.post("/request/send/:status/:userId", userAuth, async (req, res) => {
    try {
      const user = req.user;
      const fromUserId = user._id;
      const toUserId = req.params.userId;
      const status = req.params.status;
      const isAllowedStatus = ["interested", "ignored"];
      if (!isAllowedStatus.includes(status)) {
        return res.status(400).send("invalid status: " + status);
      }

      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(404).send("user not found");
      }

      const connectionRequest = await new ConnectionRequestModel({
        fromUserId,
        toUserId,
        status,
      });

      const isConnectionRequestExist = await ConnectionRequestModel.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      console.log(isConnectionRequestExist);
      if (isConnectionRequestExist) {
        return res.status(400).send("connection request already exist.");
      }

      await connectionRequest.save();
      res.send(`Connection request sent to ${connectionRequest}`);
    } catch (err) {
      res.status(400).send("requestRouterError: " + err.message);
    }
  }
);

requestRouter.post("/request/review/:status/:requestId", userAuth, async (req, res) => {
  try {
    const loggedUser = req.user;
    const { status, requestId} = req.params;

    const isAllowedStatus = ["accepted", "rejected"];
    if (!isAllowedStatus.includes(status)) {
      return res.status(400).json({message: "invalid status- " + status});
    }

    const connectionRequest = await ConnectionRequestModel.findOne({
      _id: requestId,
      toUserId: loggedUser._id,
      status: "interested"
    })

    if (!connectionRequest) {
      res.status(404).json({message:"Connection Request not found"})
    }

    connectionRequest.status = status;
    const data = await connectionRequest.save();

    res.json({message: "Connection Request " + status, data})
  } catch(err){
    res.status(400).send("requestRouterError: " + err.message);
  }
})
module.exports = {
  requestRouter,
};
