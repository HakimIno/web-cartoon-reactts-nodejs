import express from "express";
import {
  update,
  deleteUser,
  getUser,
  subscribe,
  unsubscribe,
  like,
  dislike,
} from "../controllers/user.controllers.js";
import { verifyToken } from "../verrifyToken.js";

const router = express.Router();

// update user
router.put("/:id", verifyToken, update);

// delete user
router.delete("/:id", verifyToken, deleteUser);

// get user
router.get("/find/:id", getUser);

// subscribe user
router.put("/sub/:id", verifyToken, subscribe);

// unsubscribe user
router.put("/unsub/:id", verifyToken, unsubscribe);

// like user
router.put("/like/:id", verifyToken, like);

// dislike user
router.put("/dislike/:id", verifyToken, dislike);

export default router;
