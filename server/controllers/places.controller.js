import AsyncHandler from "../utils/AsycHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiSuccess from "../utils/ApiSuccess.js";

import State from "../models/State.model.js";
import District from "../models/District.model.js";



// section 1 -> state

export const addState = AsyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) throw new ApiError(400, "Every Fields Are Required");

  const existingState = await State.findOne({ name });
  if (existingState) throw new ApiError(400, "State Already exists");

  const state = await State.create({ name });
  res
    .status(200)
    .send(new ApiSuccess(200, "State Created Successfully", state));
});

export const editState = AsyncHandler(async (req, res) => {
  const { name } = req.body;
  const { stateId } = req.params;

  if (!name) throw new ApiError(400, "Every Fields Are Required");

  const state = await State.findByIdAndUpdate(
    stateId,
    { name },
    {
      new: true,
    }
  );

  if (!state) throw new ApiError(400, "No Such State Exists");
  res
    .status(200)
    .send(new ApiSuccess(200, "State Updated Successfully", state));
});

export const deleteState = AsyncHandler(async (req, res) => {
  const { stateId } = req.params;

  const existingState = await State.findById(stateId);
  if (!existingState) throw new ApiError(400, "No Such State Exists");

  const state = await State.findByIdAndUpdate(stateId, {
    $set: { isActive: !existingState.isActive },
  });

  res
    .status(200)
    .send(new ApiSuccess(200, "State Deleted Successfully", state));
});

export const getAllState = AsyncHandler(async (req, res) => {
  const query = req.user.role === "admin" ? {} : { isActive: true };

  const state = await State.find(query);
  res
    .status(200)
    .send(new ApiSuccess(200, "State Fetched Successfully", state));
});

// section 2 -> district
export const addDistrict = AsyncHandler(async (req, res) => {
  const { name, stateId } = req.body;

  if (!name) throw new ApiError(400, "Every Fields Are Required");

  const existingDistrict = await District.findOne({ name });
  const existingState = await State.findById(stateId);

  if (existingDistrict) throw new ApiError(400, "District Already exists");

  if (!existingState) throw new ApiError(400, "No Such State exists");

  const district = await District.create({ name, state: stateId });
  existingDistrict.districts.push(district._id);
  await existingDistrict.save();

  res
    .status(200)
    .send(new ApiSuccess(200, "State Created Successfully", district));
});

export const editDistrict = AsyncHandler(async (req, res) => {
  const { name, stateId } = req.body;
  const { districtId } = req.params;

  if (!name) throw new ApiError(400, "Every Fields Are Required");

  const district = await District.findByIdAndUpdate(
    districtId,
    { name, state: stateId },
    {
      new: true,
    }
  );

  if (!district) throw new ApiError(400, "No Such district Exists");
  res
    .status(200)
    .send(new ApiSuccess(200, "State Updated Successfully", district));
});

export const deleteDistrict = AsyncHandler(async (req, res) => {
  const { DistrictId } = req.params;

  const existingDistrict = await District.findById(DistrictId);
  if (!existingDistrict) throw new ApiError(400, "No Such District Exists");

  const district = await District.findByIdAndUpdate(DistrictId, {
    $set: { isActive: !existingDistrict.isActive },
  });

  res
    .status(200)
    .send(new ApiSuccess(200, "District Deleted Successfully", istrict));
});

export const getAllDistrict = AsyncHandler(async (req, res) => {
  const query = req.user.role === "admin" ? {} : { isActive: true };

  const district = await District.find(query);
  res
    .status(200)
    .send(new ApiSuccess(200, "District Fetched Successfully", district));
});
