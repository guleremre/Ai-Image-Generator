const mongoose = require("mongoose");
const router = require("express").Router();
const AvatarController = require("../controller/avatarController");

router.get("/", AvatarController.getAllImg);
router.post("/", AvatarController.postOneImg);
router.delete("/:id", AvatarController.deleteImg);
router.put("/:id", AvatarController.updateImg);
router.get("/:userId", AvatarController.getAllUserImg);
router.get("/:Id", AvatarController.getOneImg);

module.exports = router; // bunun ismini değişme özel bu
