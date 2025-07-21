import express from "express";
import {
  addComplaint,
  getComplaints,
  getSingleComplaint,
  updateComplaintStatus,
} from "../controller/Complaint.controller.js";
import { verifyJWT } from "../middlewares/Auth.middleware.js";

const router = express.Router();

router.route("/").get(verifyJWT, getComplaints).post(verifyJWT, addComplaint);
router
  .route("/:id")
  .get(verifyJWT, getSingleComplaint)
  .patch(verifyJWT, updateComplaintStatus);
export default router;
