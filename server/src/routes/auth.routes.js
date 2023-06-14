import express from "express";
import { signup,signIn } from "../controllers/auth.controllers.js";

const router = express.Router();

//CREATE A USER
router.post("/signup",signup);
//SIGNIN
router.post("/signin", signIn)
//GOOGLE AUTH
router.post("/google", )

export default router;
