const mongoose = require("mongoose");
const router = require("express").Router();
const userController = require("../controller/userController");

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.post("/verify", userController.verify);
router.put("/:id", userController.update);
router.put("/:id", userController.updateProfile);
router.get("/:userId", userController.getAllUserImg);
router.get("/img/:userId", userController.getUserAvatar);
router.delete("/:userId", userController.removeFavoriteImg);
router.post("/:userId", userController.addFavoriteImg);

module.exports = router;
