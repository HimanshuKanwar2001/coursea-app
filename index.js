const express = require("express");
const jwt = require("jsonwebtoken");
const env = require("dotenv");
const db = require("./db/mongoDatabase");
env.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ urlencoded: true }));

app.use("/api/v1/user", require("./routes/user.routes"));
app.use("/api/v1/courses", require("./routes/courses.routes"));
app.use("/api/v1/admin", require("./routes/admin.routes"));
app.get("/", (req, res) => {
  res.json({
    message: "We are in the server",
  });
});

// app.post("/user/signin", (req, res) => {
//   res.json({
//     message: "signin endpoint",
//   });
// });

// app.get("/courses", (req, res) => {
//   res.json({
//     message: "signup endpoint",
//   });
// });

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log("Error connecting to server", process.env.PORT);
  } else {
    console.log("Connected to server", process.env.PORT);
    db();
  }
});
