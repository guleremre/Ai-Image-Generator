const mongoose = require("mongoose");
const connection = require("./connection");

const schema = new mongoose.Schema(
  {
    imgUrl: { type: String, required: true },
    prompt: { type: String },
    negative_prompt: String,
    sampler_index: String,
    steps: Number,
    cfg_scale: Number,
    seed: Number,
  },
  { timestamps: true }
);
const Img = mongoose.model("Img", schema);

module.exports = Img;
