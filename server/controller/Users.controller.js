import User from "../models/User.model.js";
import { ApiSuccess } from "../utils/ApiSuccess.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ObjectId } from "mongodb";
import Department from "../models/Department.model.js";

export const allUsers = AsyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  const users = await User.find()
    .populate("department")
    .limit(limit)
    .skip(skip);

  const totalDocs = await User.countDocuments();
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
    .send(new ApiSuccess(200, "All Users Fetched Successfully", users, pagination));
});

export const addUsers = AsyncHandler(async (req, res) => {
  const { fullname, email, password, role, department, phone } = req.body;

  if (!fullname || !email || !password || !role || !phone) {
    throw new ApiError(400, "Please Provide All Fields");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(400, "User Already Exists");
  }

  let departmentId = null;
  let existingDepartment = null;

  if (department && mongoose.Types.ObjectId.isValid(department)) {
    departmentId = department;
    existingDepartment = await Department.findById(departmentId);
  }

  const user = await User.create({
    fullname,
    email,
    password,
    role,
    phone,
    ...(departmentId && { department: departmentId }),
  });

  if (existingDepartment) {
    existingDepartment.members.push(user._id);
    await existingDepartment.save();
  }

  res.status(201).send(
    new ApiSuccess(201, "User Created Successfully", user)
  );
});

export const editUsers = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { fullname, email, password, role, phone, department } = req.body;

  if (!fullname || !email || !role || !phone) {
    throw new ApiError(400, "Please Provide All Fields");
  }

  // fetch existing user first
  const existingUser = await User.findById(id);
  if (!existingUser) {
    throw new ApiError(404, "User Not Found");
  }

  let newDepartment = null;

  if (department && mongoose.Types.ObjectId.isValid(department)) {
    newDepartment = await Department.findById(department);
    if (!newDepartment) {
      throw new ApiError(400, "No Such Department");
    }
  }

  // if department changed, clean old department
  if (
    newDepartment &&
    existingUser.department &&
    existingUser.department.toString() !== department
  ) {
    await Department.findByIdAndUpdate(
      existingUser.department,
      { $pull: { members: id } }
    );
  }

  const updatedUser = await User.findByIdAndUpdate(
    id,
    {
      $set: {
        fullname,
        email,
        password,
        role,
        phone,
        ...(newDepartment && { department }),
      },
    },
    { new: true }
  );

  // add user to new department safely
  if (newDepartment) {
    await Department.findByIdAndUpdate(
      department,
      { $addToSet: { members: id } } // prevents duplicates
    );
  }

  res
    .status(200)
    .send(new ApiSuccess(200, "User Updated Successfully", updatedUser));
});

export const deleteUsers = AsyncHandler(async (req, res) => {
  const { id } = req.params;

  const existinguser = await User.findById(id);
  if (!existinguser) {
    throw new ApiError(404, "User Not Found");
  }

  const user = await User.findByIdAndUpdate(
    id,
    { $set: { isActive: !existinguser.isActive } },
    { new: true }
  );

  res.status(200).send(new ApiSuccess(200, "User Deleted Successfully", user));
});
