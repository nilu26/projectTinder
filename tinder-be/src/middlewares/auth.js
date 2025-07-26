const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      throw new Error("Access denied. No token provided.");
    }

    const decodedToken = await jwt.verify(token, "Nilesh@123$Misty");
    const user = await User.findById(decodedToken._id);
    if (!user) {
      throw new Error("User not found.");
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(400).send("uerAuthError: " + err.message);
  }
};

module.exports = {
  userAuth,
};
