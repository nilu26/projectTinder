const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// const { default: isEmail } = require("validator/lib/isEmail");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      // validate(value) {
      //     if(!validator.isAlpha(value)) {
      //         throw new Error("First Name should contain only alphabets: " + value);
      //     }
      // }
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      // validate(value) {
      //     if (!validator.isEmail(value)){
      //         throw new Error("Please enter valid emailId: "+ value);
      //     }
      // }
    },
    password: {
      type: String,
      minLength: 8,
    },
    about: {
      type: String,
      default: "Hey there! I am using this app to find my match.",
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      lowercase: true,
      // validate(value) {
      //     if(!['male', 'female', 'others'].includes(value))
      //         throw new Error("Invalid gender!" + value)
      // },
    },
    photoUrl: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPFNeUn89NkscCQdePBFlIp7ixL81eU9pY3g&s",
      // validate(value) {
      //     if(!validator.isURL(value)) {
      //         throw new Error("invalid Photo URL!")
      //     }
      // }
    },
    skills: {
      type: [String],
    },
    //   createdBy: {
    //     type: String,
    //     default: "Nilesh Khot",
    //   },
    //   updatedBy: {
    //     type: String,
    //   },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.getJWTToken = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "Nilesh@123$Misty", {
    expiresIn: "1d",
  });
  return token;
};

userSchema.methods.validatePassword = async function (password) {
  const user = this;
  const isPasswordValid = await bcrypt.compare(password, user.password);
  return isPasswordValid;
};

module.exports = mongoose.model("User", userSchema);
