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

  if (!image1 || !image2 || !image3) {
    throw new ApiError(400, "Please provide all three images");
  }

  const departments = await Department.find({ isActive: true }).select("name description");

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
  const page = parseInt(req.query.page) || 1;
  const limit = 12;
  const skip = (page - 1) * limit;

  let query = {};
  if (req.user?.department == null || req.user.department == "public") {
    query = { user: req.user?._id };
  } else {
    query = { department: req.user?.department };
  }

  const complaints = await Complaint.find(query).limit(limit).skip(skip);
  const totalDocs = await Complaint.countDocuments(query);
  const totalPages = Math.ceil(totalDocs / limit);

  const pagination = {
    totalDocs,
    limit,
    totalPages,
    page,
    pagingCounter: skip + 1,
    hasPrevPage: page > 1,
    hasNextPage: page < totalPages,
    prevPage: page > 1 ? page - 1 : null,
    nextPage: page < totalPages ? page + 1 : null,
  };

  res
    .status(200)
    .json(new ApiSuccess(200, "Complaints fetched successfully", complaints, pagination));
});

export const getAllComplaints = AsyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 12;
  const skip = (page - 1) * limit;

  const complaints = await Complaint.find()
    .populate([
      {
        path: "user",
        select: "fullname email",
      },
      {
        path: "department",
        select: "name",
      },
    ])
    .limit(limit)
    .skip(skip);

  const totalDocs = await Complaint.countDocuments();
  const totalPages = Math.ceil(totalDocs / limit);

  const pagination = {
    totalDocs,
    limit,
    totalPages,
    page,
    pagingCounter: skip + 1,
    hasPrevPage: page > 1,
    hasNextPage: page < totalPages,
    prevPage: page > 1 ? page - 1 : null,
    nextPage: page < totalPages ? page + 1 : null,
  };

  res
    .status(200)
    .json(new ApiSuccess(200, "Complaints fetched successfully", complaints, pagination));
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
