import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/users.routes.js";
import commentRouter from "./routes/comments.routes.js";
import videoRouter from "./routes/video.routes.js";
import cors from 'cors'

const app = express();
dotenv.config();

const PORT = process.env.PORT

const connect = () => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(process.env.MONGODB)
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((err) => {
      throw err;
    });
};
//app.use(express.static("uploads"));
app.use(cookieParser());
app.use(cors())
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/videos", videoRouter);
app.use("/api/comments", commentRouter);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";

  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.listen(PORT, () => {
  connect();
  console.log("Connected to server");
  console.log(PORT);
});
