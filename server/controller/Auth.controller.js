import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiSuccess } from "../utils/ApiSuccess.js";
import User from "../models/User.model.js";

export const registerUser = AsyncHandler(async (req, res) => {
  const { fullname, email, phone, password } = req.body;

  if (!fullname || !email || !phone || !password) {
    throw new ApiError(400, "All Fields Are Required");
  }

  const existingUser = await User.findOne({ email: email });

  if (existingUser) {
    throw new ApiError(400, "User Already Exists");
  }

  const user = await User.create({
    fullname,
    email,
    phone,
    password,
  });

  res
    .status(200)
    .send(new ApiSuccess(200, "User Registered Successfully", user));
});

export const loginUser = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "All Fields Are Required");
  }

  const existingUser = await User.findOne({ email: email });

  if (!existingUser) {
    throw new ApiError(400, "Invaled Credentials");
  }

  const isMatch = await existingUser.comparePassword(password);

  if (!isMatch) {
    throw new ApiError(400, "Invalid Credentials");
  }

  const token = await existingUser.generateToken();

  res.status(200).send(
    new ApiSuccess(200, "User Logged In Successfully", {
      user: existingUser,
      token,
    })
  );
});

export const getProfile = AsyncHandler(async (req, res) => {
  const { id } = req.params;

  const existingUser = await User.findById(id);

  if (!existingUser) {
    throw new ApiError(400, "User Does Not Exists");
  }

  res
    .status(200)
    .send(
      new ApiSuccess(200, "User Profile Fetched Successfully", existingUser)
    );
});

// yet to upgrade properly
export const updateProfile = AsyncHandler(async (req, res) => {
  const { fullname, email, phone, password } = req.body;
  const { id } = req.params;

  if (!fullname || !email || !phone || !password) {
    throw new ApiError(400, "All Fields Are Required");
  }

  const existingUser = await User.findByIdAndUpdate({
    fullname,
    email,
    phone,
    password,
  },{new:true});

  if (!existingUser) {
    throw new ApiError(400, "User Does Not Exists");
  }

  res
    .status(200)
    .send(
      new ApiSuccess(200, "User Profile Updated Successfully", existingUser)
    );
});
