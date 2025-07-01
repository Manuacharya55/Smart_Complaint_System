import User from "../models/Users.model.js";
import ApiError from "../utils/ApiError.js";
import ApiSuccess from "../utils/ApiSuccess.js";
import AsyncHandler from "../utils/AsycHandler.js";

export const register = AsyncHandler(async (req, res) => {
  const { name, email, password, phone } = req.body;

  if (!name || !email || !password || !phone) {
    throw new ApiError(400, "All Fields are Required");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(400, "User ALready Exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    phone,
  });

  res
    .status(200)
    .send(new ApiSuccess(200, "User Registered Successfully", user));
});

export const login = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "All Fields are Required");
  }

  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    throw new ApiError(400, "Invalid Credentials");
  }

  const isMatch = await existingUser.checkPassword(password);

  if (!isMatch) {
    throw new ApiError(400, "Invalid Credentials");
  }

  const token = await existingUser.createToken();

  res
    .status(200)
    .send(
      new ApiSuccess(200, "User Registered Successfully", {
        user: existingUser,
        token,
      })
    );
});
