const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const imgRouter = require("./router/imgRouter");
const userRouter = require("./router/userRouter");
const cloudinary = require("cloudinary").v2;
const fileUpload = require("express-fileupload");

app.use(express.json({ limit: "50mb" }));
app.use(
  cors({
    origin: "*",
  })
);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_K,
  api_secret: process.env.CLOUD_API_SECRET,
});

app.use("/img", imgRouter);
app.use("/user", userRouter);

app.listen(process.env.port, () => {
  console.log(`server is running on ${process.env.port} `);
});
