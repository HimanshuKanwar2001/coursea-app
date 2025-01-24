const express = require("express");
const route = express.Router();
const adminController = require("../controllers/admin.controller");
const {userAuth} = require("../middleware/admin.auth.middleware");

route.post("/signup", adminController.signup);
route.post("/signin", adminController.signin);
route.post("/course", userAuth, adminController.addCourse);
route.put("/course", userAuth,adminController.updateCourse);
route.get("/course/bulk", adminController.getCourse);

module.exports = route;
