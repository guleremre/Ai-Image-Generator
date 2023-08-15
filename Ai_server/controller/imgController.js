const mongoose = require("mongoose");
const Img = require("../modules/img");
const User = require("../modules/user");
const cloudinary = require("../utils/cloudinary");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//create cloudinary image
const postCloudinary = async (req, res) => {
  const { prompt, negative_prompt, sampler_index, steps, cfg_scale, userId } =
    req.body.body2;
  const image = req.body.body2.image;
  try {
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image, {
        uploadPreset: "imgfavs",
        folder: "imgfavs",
      });
      if (uploadResponse) {
        const imgObj = new Img({
          image: uploadResponse.secure_url,
          prompt,
          negative_prompt,
          sampler_index,
          steps,
          cfg_scale,
          userId,
        });
        const img = new Img(imgObj);
        const savedImg = await img.save();
        res
          .status(200)
          .send({ savedImg, msg: "Image successfully uploaded to database" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error uploading image to Cloudinary" });
  }
};

// GET cloudinary
const getCloudinary = async (req, res) => {
  try {
    const img = await Img.find();
    res.status(200).send(img);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
//GET ALL IMGS
const getAllImg = async (req, res) => {
  try {
    const imgs = await Img.find({});
    res.status(200).json(imgs);
  } catch (err) {
    res.status(500).json({ msg: err.msg });
  }
};

//DELETE A IMG
const deleteImg = async (req, res) => {
  try {
    const deleteOneImg = await Img.deleteOne({ _id: req.params.id });
    res.json(deleteOneImg);
  } catch (err) {
    res.status(500).json({ msg: err.msg });
  }
};
//UPDATE A IMG
const updateImg = async (req, res) => {
  try {
    const updatedImg = await Img.findByIdAndUpdate(
      { _id: req.params.id },
      req.body
    );
    res.status(200).json(updatedImg);
  } catch (err) {
    res.status(500).json({ msg: err.msg });
  }
};

//GET ALL IMGS OF ONE USER
const getAllUserImg = async (req, res) => {
  try {
    const imgs = await Img.find({ userId: req.params.userId });
    res.status(200).json(imgs);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err.msg });
  }
};
//GET IMGS OF ONE USER
const getOneImg = async (req, res) => {
  const _id = req.params.id;
  try {
    const Imgs = await Img.findOne({ _id });
    res.json(Imgs);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getAllImg,
  // postOneImg,
  deleteImg,
  updateImg,
  getAllUserImg,
  getOneImg,
  // addFavoriteImg,
  // removeFavoriteImg,
  getCloudinary,
  postCloudinary,
  // addFavoriteImg,
};
