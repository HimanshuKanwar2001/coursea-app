const express = require("express");
const route = express.Router();
const userController = require("../controllers/user.controller");
const { userAuth } = require("../middleware/user.auth.middleware");

route.get("/", userController.getAllUsers);
route.post("/signup", userController.signup);
route.post("/signin", userController.signin);
route.get("/purchases", userAuth, userController.userPurchases);

module.exports = route;
