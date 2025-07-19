const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();

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

app.post("/signUp", async (req, res) => {
  const data = req.body;
  console.log("data----------: ", data);
  //   const userObj = {
  //     firstName: "Nilesh",
  //     lastName: "khot",
  //     emailId: "nilesh@khot.com",
  //     password: "Nilesh@123",
  //     gender: "Male",
  //     age: 30,
  //   };

  try {
    const user = new User(data);
    const isUserExists = await User.findOne({ emailId: user.emailId });
    if (isUserExists) {
      throw new Error("EmailId already exists, use different emailId");
    } else {
      user.save();
      res.send("User added successfully");
    }
  } catch (err) {
    res.status(400).send(err.message || "Failed to add User.");
  }
});

app.get("/getAllUsers", async (req, res) => {
  try {
    const data = req.body;
    const user = await User.find({});
    console.log("Here is all User data from mongoDB");
    res.send(user);
  } catch (err) {
    res.status(400).send("Failed to fetch Users.");
  }
});

app.get("/getUser", async (req, res) => {
  const data = req.body.emailId;
  try {
    const user = await User.findOne({ emailId: data });
    if (!user) {
      throw new Error();
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(404).send(`Failed to fetch User- ${data}.`);
  }
});

app.delete("/deleteUser", async (req, res) => {
  const data = req.body.emailId;
  try {
    const user = await User.deleteOne({ emailId: data });
    if (!user) {
      throw new Error();
    } else {
      res.send("User is deleted user successfully");
    }
  } catch (err) {
    res.status(404).send(`${data} not found to delete.`);
  }
});

app.patch("/updateUser", async (req, res) => {
  const data = req.body;
  try {
    const { emailId, ...updateFields } = data;
    updateFields.updatedOn = new Date();
    updateFields.updatedBy = "Nilesh Khot";
    const resp = await User.updateOne(
      { emailId: emailId },
      { $set: updateFields }
    );
    res.send("User updated successfully.");
  } catch (err) {
    res.status(400).send(err.message || "Failed to update user");
  }
});

connectDB()
  .then(() => {
    console.log("database connected successfully...");

    app.listen(3001, () => {
      console.log("Server is successfully listening on port 3001... ");
    });
  })
  .catch(() => console.log("Failed to connect database..."));
