const express = require("express");
const router = express.Router();

const favoriteImgController = require("../controller/imgController");

router.put("/:id", favoriteImgController.addFavoriteImg);
router.delete("/:id", favoriteImgController.removeFavoriteImg);

module.exports = router;
