const mongoose = require("mongoose");
const connection = require("./connection");

const schema = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  { timestamps: true }
);
const User = mongoose.model("User", schema);

module.exports = User;
