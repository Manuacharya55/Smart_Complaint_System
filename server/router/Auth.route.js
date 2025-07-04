import express from "express";
import { getProfile, loginUser, registerUser, updateProfile } from "../controller/Auth.controller.js";
import { verifyJWT } from "../middlewares/Auth.middleware.js";

const router = express.Router();

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/getProfile").get(verifyJWT,getProfile)
router.route("/updateProfile").patch(updateProfile)

export default router;