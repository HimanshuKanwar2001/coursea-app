const express = require("express");
const route = express.Router();
const adminController = require("../controllers/admin.controller");

route.post("/signup", adminController.signup);
route.post("/signin", adminController.signin);
route.post("/course", adminController.addCourse);
route.put("/course", adminController.updateCourse);
route.get("/course/bulk", adminController.getCourse);

module.exports = route;
