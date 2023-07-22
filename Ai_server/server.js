const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

app.use(express.json({ limit: "50mb" }));

const imgRouter = require("./router/imgRouter");
const userRouter = require("./router/userRouter");

app.use(
  cors({
    origin: "*",
  })
);

app.use("/img", imgRouter);
app.use("/user", userRouter);

app.listen(process.env.port, () => {
  console.log(`server is running on ${process.env.port} `);
});
