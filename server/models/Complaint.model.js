import { Schema, model } from "mongoose";

const ComplaintSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      // required: true,
    },
    department: {
      type: Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    authority: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    images: [String],
    location: {
      state: String,
      district: String,
      place: String,
      latitude: Number,
      longitude: Number,
    },
    problem: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["Quick Fix", "Moderate", "Easy"],
    },
    status: {
      type: String,
      enum: ["Pending", "Processing", "Resolved", "Rejected"],
      default: "Pending",
    },
    description: {
      type: String,
      required: true,
    },
    feedback: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Complaint = model("Complaint", ComplaintSchema);

export default Complaint;
