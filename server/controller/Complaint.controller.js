import Complaint from "../models/Complaint.model.js";
import Department from "../models/Department.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiSuccess } from "../utils/ApiSuccess.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { imageAnalysis } from "../utils/GeminiServices.js";
import { sendMail } from "../utils/Mail.js";

export const addComplaint = async (req, res) => {
  const {
    image1,
    image2,
    image3,
    state,
    district,
    place,
    longitude,
    latitude,
  } = req.body;

  console.log(req.body)
  if (!image1 || !image2 || !image3) {
    throw new ApiError(400, "Please provide all three images");
  }

  const departments = await Department.find({ isActive: true }).select("name");

  const data = await imageAnalysis(image1, departments);

  if (data.department === null) {
    throw new ApiError(400, "No relevant department found for the complaint");
  }

  const existingDepartment = await Department.findOne({
    name: data.department,
  });
  if (!existingDepartment) {
    throw new ApiError(400, "Department not found");
  }
  const complaint = await Complaint.create({
    description: data.description,
    problem: data.problem,
    type: data.problemEnum,
    department: existingDepartment._id,
    user: req.user?._id,
    images: [image1, image2, image3],
    location: {
      state,
      district,
      place,
      longitude,
      latitude,
    },
  });
  res
    .status(201)
    .json(new ApiSuccess(201, "Complaint created successfully", complaint));
};

export const getComplaints = AsyncHandler(async (req, res) => {
  if (req.user?.department == null || req.user.department == "public") {
    const complaints = await Complaint.find({ user: req.user?._id });
    res
      .status(200)
      .json(new ApiSuccess(200, "Complaints fetched successfully", complaints));
  } else {
    const complaints = await Complaint.find({
      department: req.user?.department,
    });
    res
      .status(200)
      .json(new ApiSuccess(200, "Complaints fetched successfully", complaints));
  }
});

export const getSingleComplaint = AsyncHandler(async (req, res) => {
  const { id } = req.params;

  const complaint = await Complaint.findById(id)
    .populate("user", "name email")
    .populate("department", "name")
    .populate("authority", "name email");

  if (!complaint) {
    throw new ApiError(404, "Complaint not found");
  }

  res
    .status(200)
    .json(new ApiSuccess(200, "Complaint fetched successfully", complaint));
});

export const updateComplaintStatus = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!["Pending", "Processing", "Resolved", "Rejected"].includes(status)) {
    throw new ApiError(400, "Invalid status");
  }

  const complaint = await Complaint.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );

  if (!complaint) {
    throw new ApiError(404, "Complaint not found");
  }

  // Send email to user
  if (req.user?.email) {
    await sendMail({
      to: req.user.email,
      subject: `Your complaint status has been updated`,
      text: `Hello,\n\nThe status of your complaint (ID: ${complaint._id}) has been updated to: ${status}.\n\nThank you.`,
    });
  }

  res
    .status(200)
    .json(
      new ApiSuccess(200, "Complaint status updated successfully", complaint)
    );
});
