import Department from "../models/Department.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiSuccess } from "../utils/ApiSuccess.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";

export const getAllDepartment = AsyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;
  const department = await Department.find().limit(limit).skip(skip);

  res
    .status(200)
    .send(new ApiSuccess(200, "Department Fetched Successfully", department));
});

export const getSingleDepartment = AsyncHandler(async (req, res) => {
  const { id } = req.params;

  const department = await Department.findById(id).populate("members");

  if (!department) {
    throw new ApiError(400, "No Such Department");
  }

  res
    .status(200)
    .send(new ApiSuccess(200, "Department Fetched Successfully", department));
});

export const addDepartment = AsyncHandler(async (req, res) => {
  const { name,description } = req.body;
console.log(req.body)
  const existingDepartment = await Department.findOne({ name });

  if (existingDepartment) {
    throw new ApiError(400, "Department Already Exists");
  }

  const department = await Department.create({ name,description });
  res
    .status(200)
    .send(new ApiSuccess(200, "Department Added Successfully", department));
});

export const updateDepartment = AsyncHandler(async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;

  const existingDepartment = await Department.findByIdAndUpdate(
    id,
    { $set: { name: name } },
    { new: true }
  );

  if (!existingDepartment) {
    throw new ApiError(400, "No such Department exists");
  }

  res
    .status(200)
    .send(
      new ApiSuccess(200, "Department Updated Successfully", existingDepartment)
    );
});

export const deleteDepartment = AsyncHandler(async (req, res) => {
  const { id } = req.params;

  const existingDepartment = await Department.findById(id);

  if (!existingDepartment) {
    throw new ApiError(400, "No such Department exists");
  }

  const department = await Department.findByIdAndUpdate(
    id,
    { $set: { isActive: !existingDepartment.isActive } },
    { new: true }
  );
  res
    .status(200)
    .send(new ApiSuccess(200, "Department Updated Successfully", department));
});
