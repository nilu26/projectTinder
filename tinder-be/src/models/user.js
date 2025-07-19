const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
  },
  password: {
    type: String,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: String,
    default: "Nilesh Khot",
  },
  updatedOn: {
    type: Date,
  },
  updatedBy: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
