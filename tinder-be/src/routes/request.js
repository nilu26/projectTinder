const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");

requestRouter.get("/sendConnectionRequest", userAuth, (req, res) => {
  try {
    const user = req.user;
    const { firstName } = user;
    res.send(`Connection request sent to ${firstName}`);
  } catch (err) {
    res.status(400).send("requestRouterError: " + err.message);
  }
});

module.exports = {
  requestRouter,
};
