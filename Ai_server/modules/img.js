const mongoose = require("mongoose");
const connection = require("./connection");

const schema = new mongoose.Schema(
  {
    image: { type: Object },
    prompt: { type: String },
    negative_prompt: { type: String },
    sampler_index: String,
    steps: Number,
    cfg_scale: Number,
    userId: String,
  },
  { timestamps: true }
);
const Img = mongoose.model("Img", schema);

module.exports = Img;
