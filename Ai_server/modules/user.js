const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    imgUrl: { type: String },
    favoriteBooks: { type: Array },
  },
  { timestamps: true }
);
const User = mongoose.model("User", schema);

module.exports = User;
