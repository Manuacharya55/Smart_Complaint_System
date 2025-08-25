import express from "express";
import {
  addComplaint,
  getAllComplaints,
  getComplaints,
  getSingleComplaint,
  updateComplaintStatus,
} from "../controller/Complaint.controller.js";
import { verifyAdmin, verifyJWT } from "../middlewares/Auth.middleware.js";

const router = express.Router();

router.route("/").get(verifyJWT, getComplaints).post(verifyJWT, addComplaint);
router.route("/all-complaints").get(verifyJWT, verifyAdmin, getAllComplaints);

router
  .route("/:id")
  .get(verifyJWT, getSingleComplaint)
  .patch(verifyJWT, updateComplaintStatus);
export default router;
