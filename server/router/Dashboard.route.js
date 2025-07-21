import express from "express";
import { getDashboardStats } from "../controller/Dashboard.controller.js";
import { verifyAdmin, verifyJWT } from "../middlewares/Auth.middleware.js";

const router = express.Router();

router.route("/").get(verifyJWT, verifyAdmin, getDashboardStats);
export default router;
