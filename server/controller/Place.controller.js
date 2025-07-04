import Place from "../models/Place.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiSuccess } from "../utils/ApiSuccess.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";

export const getAllPlace = AsyncHandler(async (req, res) => {
  const place = await Place.find();

  res
    .status(200)
    .send(new ApiSuccess(200, "Place Fetched Successfully", place));
});

export const getSinglePlace = AsyncHandler(async (req, res) => {
  const { id } = req.params;

  const place = await Place.findById(id).populate("members");

  if (!place) {
    throw new ApiError(400, "No Such Place");
  }

  res
    .status(200)
    .send(new ApiSuccess(200, "Place Fetched Successfully", place));
});

export const addPlace = AsyncHandler(async (req, res) => {
  const { name } = req.body;

  const existingPlace = await Place.findOne({ name });

  if (existingPlace) {
    throw new ApiError(400, "Place Already Exists");
  }

  const place = await Place.create({ name });
  res
    .status(200)
    .send(new ApiSuccess(200, "Place Added Successfully", place));
});

export const updatePlace = AsyncHandler(async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;

  const existingPlace = await Place.findByIdAndUpdate(
    id,
    { $set: { name: name } },
    { new: true }
  );

  if (!existingPlace) {
    throw new ApiError(400, "No such Place exists");
  }

  res
    .status(200)
    .send(
      new ApiSuccess(200, "Place Updated Successfully", existingPlace)
    );
});

export const deletePlace = AsyncHandler(async (req, res) => {
  const { id } = req.params;

  const existingPlace = await Place.findById(id);

  if (!existingPlace) {
    throw new ApiError(400, "No such Place exists");
  }

  const place = await Place.findByIdAndUpdate(
    id,
    { $set: { isActive: !existingPlace.isActive } },
    { new: true }
  );
  res
    .status(200)
    .send(new ApiSuccess(200, "Place Updated Successfully", place));
});
