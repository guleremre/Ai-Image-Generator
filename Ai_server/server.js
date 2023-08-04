const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const imgRouter = require("./router/imgRouter");
const userRouter = require("./router/userRouter");
const favoriteImgController = require("./router/favoriteImage");

app.use(express.json({ limit: "50mb" }));

app.use(
  cors({
    origin: "*",
  })
);

app.use("/img", imgRouter);
app.use("/user", userRouter);
app.use("/user", favoriteImgController);

app.listen(process.env.port, () => {
  console.log(`server is running on ${process.env.port} `);
});
