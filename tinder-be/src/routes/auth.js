const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { validateFields } = require("../utils/validations");
const { userAuth } = require("../middlewares/auth");

authRouter.post("/signUp", async (req, res) => {
  const data = req.body;

  try {
    validateFields(data);
    const encryptPassword = await bcrypt.hash(data.password, 10);
    data.password = encryptPassword;
    const user = new User(data);
    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send(err.message || "Failed to add User.");
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid emailId or password");
    }
    const isPasswordMatch = await user.validatePassword(password);
    if (isPasswordMatch) {
      const jwtToken = await user.getJWTToken();
      res.cookie("token", jwtToken);
      res.send("User logged in successfully");
    } else {
      throw new Error("Invalid emailId or password");
    }
  } catch (err) {
    res.status(400).send("authRouterError: " + err.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res
    .cookie("token", null, {
      expires: new Date(Date.now()),
    })
    .send("User logged out successfully");
});

module.exports = {
  authRouter,
};
