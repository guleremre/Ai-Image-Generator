const mongoose = require("mongoose");
const connection = require("./connection");

const schema = new mongoose.Schema(
  {
    img: { type: String },
    prompt: { type: String },
    negative_prompt: { type: String },
    sampler_index: String,
    steps: Number,
    cfg_scale: Number,
    seed: Number,
    userId: String,
  },
  { timestamps: true }
);
const Img = mongoose.model("Img", schema);

module.exports = Img;
