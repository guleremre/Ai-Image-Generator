const mongoose = require("mongoose");
const connection = require("./connection");

const schema = new mongoose.Schema(
  {
    Base64Img: { type: String, required: true },
    prompt: { type: String },
    userId: String,
  },
  { timestamps: true }
);
const Img = mongoose.model("Img", schema);

module.exports = Img;
