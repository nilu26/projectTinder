const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validateFields, fieldsToBeUpdated } = require("../utils/validations");

profileRouter.get("/profile/view", userAuth, (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("profileRouterError: view: " + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    const data = req.body;
    const loggedInUser = req.user;
    if (!fieldsToBeUpdated(data)) {
      throw new Error("Some fields are restricted to update!");
    }
    validateFields(data, true);

    Object.keys(data).forEach((key) => (loggedInUser[key] = data[key]));
    await loggedInUser.save();

    res.json({
      message: `${loggedInUser.firstName} profile updated successfully.`,
      user: loggedInUser,
    });
    // res.send("User updated successfully.");
  } catch (err) {
    res.status(400).send("profileRouterError: Update: " + err.message);
  }
});

module.exports = {
  profileRouter,
};
