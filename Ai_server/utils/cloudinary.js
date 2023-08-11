const dotenv = require("dotenv");
const cloudinaryModule = require("cloudinary");

require("dotenv").config();

dotenv.config();

const cloudinary = cloudinaryModule.v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_secret: process.env.CLOUD_API_SECRET,
  api_key: process.env.CLOUD_API_K,
});

module.exports = cloudinary;
