import express from "express";
import {
  addComplaint,
  getComplaints,
  getSingleComplaint,
  updateComplaintStatus,
} from "../controller/Complaint.controller.js";

const router = express.Router();

router.route("/").get(getComplaints).post(addComplaint);
router.route("/:id").get(getSingleComplaint).patch(updateComplaintStatus);
export default router;
