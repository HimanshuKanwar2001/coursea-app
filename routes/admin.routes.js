const express = require("express");
const route = express.Router();

route.post("/signup");
route.post("/signin");
route.post("/course");
route.post("/course/bulk");

module.exports = route;
