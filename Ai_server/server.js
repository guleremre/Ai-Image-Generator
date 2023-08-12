const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const imgRouter = require("./router/imgRouter");
const userRouter = require("./router/userRouter");
const favoriteImgController = require("./router/favoriteImage");
const cloudinary = require("cloudinary").v2;

app.use(express.json({ limit: "5mb" }));
app.use(
  cors({
    origin: "*",
  })
);
app.use("/img", imgRouter);
app.use("/user", userRouter);
app.use("/img", favoriteImgController);

app.listen(process.env.port, () => {
  console.log(`server is running on ${process.env.port} `);
});
