const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();
const { fieldsToBeUpdated } = require("./utils/validations");
const { authRouter } = require("./routes/auth");
const { profileRouter } = require("./routes/profile");
const { requestRouter } = require("./routes/request");

const cookieParser = require("cookie-parser");

// app.use("/user", (req, res, next) => {
//     try{

//         const token = 'abc';
//         if (token !== 'abc'){
//             throw new Error("not autorized");
//         }
//         res.send({firstname: "Nilesh", lastname: "khot"})
//     } catch(error){
//         res.status(500).send("error:500 - not autorized");
//     }
// })

// app.use("/user", (req,res, next) => {
//     res.send("Data Saved Successfully");
// })

// app.use("/user", (req, res) => {
//     res.send("User deleted Successfully");
// })

// app.use("/nilesh", (req, res) => {
//     res.send("Hello from NK....!!");
// });

// app.use("/praju", (req, res) => {
//     res.send("Hello from PRAJU....!!");
// });

// app.use("/", (req, res) => {
//     res.send("Hello from Dashboard....!!");
// });
app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

// app.get("/getAllUsers", async (req, res) => {
//   try {
//     const data = req.body;
//     const user = await User.find({});
//     console.log("Here is all User data from mongoDB");
//     res.send(user);
//   } catch (err) {
//     res.status(400).send("Failed to fetch Users.");
//   }
// });

// app.get("/getUser", async (req, res) => {
//   const data = req.body.emailId;
//   try {
//     const user = await User.findOne({ emailId: data });
//     if (!user) {
//       throw new Error();
//     } else {
//       res.send(user);
//     }
//   } catch (err) {
//     res.status(404).send(`Failed to fetch User- ${data}.`);
//   }
// });

// app.delete("/deleteUser/:userId", async (req, res) => {
//   // const data = req.body.emailId;
//   const userId = req.params?.userId;
//   try {
//     const user = await User.deleteOne({ _id: userId });
//     res.send("User is deleted successfully");
//   } catch (err) {
//     res.status(404).send("Failed to delete User");
//   }
// });

// app.patch("/updateUser/:userId", async (req, res) => {
//   const data = req.body;
//   const userId = req.params?.userId;
//   try {
//     if (!fieldsToBeUpdated(data)) {
//       throw new Error("Some fields are restricted to update!");
//     }

//     if (data?.skills.length > 10) {
//       throw new Error("Skills cannot bew more that 10!");
//     }
//     const { emailId, ...updateFields } = data;
//     // updateFields.updatedBy = "Nilesh Khot";
//     const resp = await User.updateOne(
//       { _id: userId },
//       { $set: updateFields },
//       { runValidators: true }
//     );
//     res.send("User updated successfully.");
//   } catch (err) {
//     res.status(400).send(err.message || "Failed to update user");
//   }
// });

connectDB()
  .then(() => {
    console.log("database connected successfully...");

    app.listen(3001, () => {
      console.log("Server is successfully listening on port 3001... ");
    });
  })
  .catch(() => console.log("Failed to connect database..."));
