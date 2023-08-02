const mongoose = require("mongoose");
const connection = require("./connection");

const schema = new mongoose.Schema(
  {
    avatar: { type: String, required: true },
    userId: String,
  },
  { timestamps: true }
);
const Img = mongoose.model("Img", schema);

module.exports = Img;
