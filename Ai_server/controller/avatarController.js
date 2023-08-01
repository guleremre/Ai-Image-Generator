const mongoose = require("mongoose");
const Avatar = require("../modules/avatar");
const cloudinary = require("cloudinary").v2;

//GET ALL IMGS
const getAllImg = async (req, res) => {
  try {
    const avatars = await Avatar.find({});
    res.status(200).json(imgs);
  } catch (err) {
    res.status(500).json({ msg: err.msg });
  }
};

//CREATE NEW IMG
const postOneImg = async (req, res) => {
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: "ai_generator",
    }
  );
  console.log("result", result);
  try {
    const newImg = await Avatar.create(req.body);
    res.status(201).json({ msg: "Avatar successfully uploaded" });
  } catch (err) {
    res.status(409).json({ msg: err.msg });
  }
};

//DELETE A IMG
const deleteImg = async (req, res) => {
  try {
    const deleteOneImg = await Avatar.deleteOne({ _id: req.params.id });
    res.json(deleteOneImg);
  } catch (err) {
    res.status(500).json({ msg: err.msg });
  }
};
//UPDATE A IMG
const updateImg = async (req, res) => {
  try {
    const updateImg = await Avatar.findByIdAndUpdate(
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
    const imgs = await Avatar.find({ userId: req.params.userId });
    res.status(200).json(imgs);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err.msg });
  }
};

const getOneImg = async (req, res) => {
  const _id = req.params.id;
  try {
    const Imgs = await Avatar.findOne({ _id });
    res.json(Imgs);
  } catch (err) {
    console.log(err);
  }
};
module.exports = {
  getAllImg,
  postOneImg,
  deleteImg,
  updateImg,
  getAllUserImg,
  getOneImg,
};
