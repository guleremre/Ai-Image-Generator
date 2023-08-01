const mongoose = require("mongoose");
const connection = require("./connection");

const schema = new mongoose.Schema(
  {
    Avatar: { type: String, required: true },
    userId: String,
  },
  { timestamps: true }
);
const Avatar = mongoose.model("Avatar", schema);

module.exports = Avatar;
