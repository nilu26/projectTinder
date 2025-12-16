const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://misty:jUIttNVVUothN6wi@misty.dwwifqe.mongodb.net/project_tinder"
  );
};

// connectDB()
// .then( ()=>
//     console.log("database connected successfully...")
// )
// .catch( () =>
//     console.log("Failed to connect database...")
// )

module.exports = connectDB;
