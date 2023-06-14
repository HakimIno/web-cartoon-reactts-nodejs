import express from "express";
import { CommentsController } from "../controllers/comments.controllers.js";

const router = express.Router();

router.get("/", CommentsController);

export default router;
