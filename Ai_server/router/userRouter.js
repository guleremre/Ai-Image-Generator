const mongoose = require("mongoose");
const router = require("express").Router();
const userController = require("../controller/userController");

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.post("/verify", userController.verify);

module.exports = router;
