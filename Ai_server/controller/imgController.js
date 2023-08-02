const mongoose = require("mongoose");
const Img = require("../modules/img");

//GET ALL IMGS
const getAllImg = async (req, res) => {
  try {
    const imgs = await Img.find({});
    res.status(200).json(imgs);
  } catch (err) {
    res.status(500).json({ msg: err.msg });
  }
};
//CREATE NEW IMG
const postOneImg = async (req, res) => {
  console.log("hello", req.body);
  try {
    const newImg = await Img.create(req.body);
    res.status(201).json({ msg: "Img successfully uploaded" });
  } catch (err) {
    console.log(err);
    res.status(409).json({ msg: err.msg });
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
  postOneImg,
  deleteImg,
  updateImg,
  getAllUserImg,
  getOneImg,
};
