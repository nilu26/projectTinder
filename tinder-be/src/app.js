const express = require("express");

const app = express();

app.get("/user", (req,res) => {
    res.send({firstname: "Nilesh", lastname: "khot"})
})

app.post("/user", (req,res) => {
    res.send("Data Saved Successfully");
})

app.delete("/user", (req, res) => {
    res.send("User deleted Successfully");
})

// app.use("/nilesh", (req, res) => {
//     res.send("Hello from NK....!!");
// });

// app.use("/praju", (req, res) => {
//     res.send("Hello from PRAJU....!!");
// });

// app.use("/", (req, res) => {
//     res.send("Hello from Dashboard....!!");
// });

app.listen(3001, () => {
    console.log("Server is successfully listening on port 3001... ")
});