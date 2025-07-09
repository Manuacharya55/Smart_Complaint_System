import Complaint from "../models/Complaint.model.js";
import Department from "../models/Department.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiSuccess } from "../utils/ApiSuccess.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { imageAnalysis } from "../utils/GeminiServices.js";

export const addComplaint = async (req, res) => {
    const {img1,img2,img3} = req.body;

    if(!img1 || !img2 || !img3) {
        throw new ApiError(400, "Please provide all three images");
    }

    const departments = await Department.find({isActive: true}).select("name");

    const data = await imageAnalysis(img1,departments);

    if(data.department === null) {
        throw new ApiError(400, "No relevant department found for the complaint");
    }

    const existingDepartment = await Department.findOne({ name: data.department });
    if (!existingDepartment) {
        throw new ApiError(400, "Department not found");
    }
    const complaint = await Complaint.create({
        description: data.description,
        problem: data.problem,
        type: data.problemEnum,
        department: existingDepartment._id,
        user: req.user?._id,
        images:[img1,img2,img3],

    });
    res.status(201).json(
        new ApiSuccess(201, "Complaint created successfully", complaint)
    );
};

export const getComplaints = AsyncHandler(async (req, res) => {
  const { id } = req.params;

  const existingDepartment = await Department.findById(id);
  if (!existingDepartment) {
    throw new ApiError(404, "Department not found");
  }

  const complaints = await Complaint.find({ department: id });

  res
    .status(200)
    .json(new ApiSuccess(200, "Complaints fetched successfully", complaints));
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
    
    if (!["Pending", "In Progress", "Resolved", "Rejected"].includes(status)) {
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
    
    res
        .status(200)
        .json(new ApiSuccess(200, "Complaint status updated successfully", complaint));
});


