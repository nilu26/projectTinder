const mongoose = require("mongoose");
const validator = require("validator");
// const { default: isEmail } = require("validator/lib/isEmail");

const userSchema = new mongoose.Schema({
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
    minLength: 8
  },
  age: {
    type: Number,
    min: 18
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
    default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPFNeUn89NkscCQdePBFlIp7ixL81eU9pY3g&s",
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
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);
