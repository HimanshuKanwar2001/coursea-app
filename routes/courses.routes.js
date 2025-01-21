const express = require("express");
const route = express.Router();
const courseController = require("../controllers/course.controller");

route.get("/purchases", courseController.getAllCourses);
route.post("/course", courseController.purchase);

module.exports = route;
