const mongoose = require("mongoose");
const router = require("express").Router();
const ImgController = require("../controller/imgController");
const cloudinary = require("../utils/cloudinary");
const userController = require("../controller/userController");

router.get("/", ImgController.getAllImg);
// router.post("/one", ImgController.postOneImg);
router.delete("/:id", ImgController.deleteImg);
router.put("/:id", ImgController.updateImg);
router.get("/:userId", ImgController.getAllUserImg);
// router.get("/:Id", ImgController.getOneImg);
router.get("/", ImgController.getCloudinary);
router.post("/", ImgController.postCloudinary);

router.delete("/:userId", ImgController.removeFavoriteImg);
router.post("/:userId", ImgController.addFavoriteImg);

module.exports = router; // bunun ismini değişme özel bu
