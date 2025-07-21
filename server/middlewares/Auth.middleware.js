import jwt from "jsonwebtoken";
import User from "../models/User.model.js";
import { ApiError } from "../utils/ApiError.js";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";

export const verifyJWT = async (req, res, next) => {
  const token = req.header("Authorization").split(" ")[1];

  const decoded = await jwt.verify(token, process.env.JWT_SECRET);
  const obj = new ObjectId(decoded._id);

  const existingUser = await User.findById(obj);

  if (!existingUser) {
    throw new ApiError(400, "Not Verified User");
  }

  req.user = existingUser;
  next();
};

export const verifyAdmin = async (req, res, next) => {
  const { role } = req.user;
  if (role !== "admin") {
    throw new ApiError(400, "Not Authorized");
  }
  next();
};
