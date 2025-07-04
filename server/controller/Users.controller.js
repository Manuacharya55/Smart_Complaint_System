import User from "../models/User.model.js";
import { ApiSuccess } from "../utils/ApiSuccess.js";
import {AsyncHandler} from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

export const allUsers = AsyncHandler(async (req, res) => {
  const users = await User.find().populate("department");
  res
    .status(200)
    .send(new ApiSuccess(200, "All Users Fetched Successfully", users));
});

export const addUsers = AsyncHandler(async (req, res) => {
  const { fullname, email, password, role ,department,phone} = req.body;
  if (!fullname || !email || !password || !role || !phone) {
    throw new ApiError(400, "Please Provide All Fields");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(400, "User Already Exists");
  }

  const user = await User.create({ fullname, email, password, role, department,phone });
  res.status(201).send(new ApiSuccess(201, "User Created Successfully", user));
});

export const editUsers = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { fullname, email, password, role,phone } = req.body;

let {department} = req.body || "public";
  if (!fullname || !email || !password || !role) {
    throw new ApiError(400, "Please Provide All Fields");
  }

  const user = await User.findByIdAndUpdate(
    id,
    { $set: { fullname, email, password, role,phone,department } },
    { new: true }
  );
  if (!user) {
    throw new ApiError(404, "User Not Found");
  }

  res.status(200).send(new ApiSuccess(200, "User Updated Successfully", user));
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
