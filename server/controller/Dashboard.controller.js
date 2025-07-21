import User from "../models/User.model.js";
import Department from "../models/Department.model.js";
import Places from "../models/Place.model.js";
import Complaint from "../models/Complaint.model.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiSuccess } from "../utils/ApiSuccess.js";

export const getDashboardStats = AsyncHandler(async (req, res) => {
  const [totalUsers, totalDepartments, totalPlaces] = await Promise.all([
    User.countDocuments(),
    Department.countDocuments(),
    Places.countDocuments(),
  ]);

  const complaintStatuses = await Complaint.aggregate([
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  const statusCounts = {
    Pending: 0,
    Processing: 0,
    Resolved: 0,
  };

  complaintStatuses.forEach((item) => {
    if (statusCounts.hasOwnProperty(item._id)) {
      statusCounts[item._id] = item.count;
    }
  });

  res.json(
    new ApiSuccess(201, "Data Fetched Successfully", {
      totalUsers,
      totalDepartments,
      totalPlaces,
      complaints: statusCounts,
    })
  );
});
