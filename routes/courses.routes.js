const express = require("express");
const route = express.Router();
const courseController = require("../controllers/course.controller");

route.get("/purchases", courseController.purchase);
route.post("/preview", courseController.preview);

module.exports = route;
