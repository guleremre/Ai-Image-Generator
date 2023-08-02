const mongoose = require("mongoose");
const router = require("express").Router();
const ImgController = require("../controller/imgController");

router.get("/", ImgController.getAllImg);
router.post("/", ImgController.postOneImg);
router.delete("/:id", ImgController.deleteImg);
router.put("/:id", ImgController.updateImg);
router.get("/:userId", ImgController.getAllUserImg);
router.get("/:Id", ImgController.getOneImg);

module.exports = router; // bunun ismini değişme özel bu
