import express from "express";
import {
  addVideo,
  addView,
  deleteVideo,
  getVideo,
  random,
  sub,
  trend,
  updateVideo,
} from "../controllers/video.controllers.js";
import { verifyToken } from "../verrifyToken.js";
import multer from "multer";
import fs from 'fs'

const router = express.Router();


const videoFilter = (req, file, cd) => {
  if (!file.originalname.match(/\,(mp4|mkv|avi)$/)) {
    return cd(new Error("Only video file are allowed"), false);
  }
  cd(null, true);
};

const upload = multer({ storage: multer.memoryStorage()})

const multiUpload = upload.fields([
  {
    name: "imageUrl", maxCount:1
  },
  {
    name: "videoUrl", maxCount:1
  },
])

//create a video
router.post("/",multiUpload,verifyToken, addVideo);
router.put("/:id", verifyToken, updateVideo);
router.delete("/:id", verifyToken, deleteVideo);
router.get("/find/:id", getVideo);
router.put("/view/:id", addView);
router.get("/trend", trend);
router.get("/random", random);
router.get("/sub", verifyToken, sub);

export default router;
