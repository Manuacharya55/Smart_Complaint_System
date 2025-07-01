import AsyncHandler from "../utils/AsycHandler.js";
import ApiError from "../utils/ApiError.js";
import Department from "../models/Department.model.js";
import ApiSuccess from "../utils/ApiSuccess.js";

// 1. add department
export const addDepartment = AsyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) throw new ApiError(400, "All Fields Are Required");

  const existingDepartment = await Department.findOne({ name });
  if (existingDepartment) throw new ApiError(400, "Department Already exists");

  const department = await Department.create({ name });
  res
    .status(200)
    .send(new ApiSuccess(200, "Department Created Successfully", department));
});

// 2. edit department
export const editDepartment = AsyncHandler(async (req, res) => {
  const { name } = req.body;
  const { deptId } = req.params;

  if (!name) throw new ApiError(400, "All Fields Are Required");

  const department = await Department.findByIdAndUpdate(
    deptId,
    { name },
    {
      new: true,
    }
  );

  if (!department) throw new ApiError(400, "No Such Department Exists");

  res
    .status(200)
    .send(new ApiSuccess(200, "Department Updated Successfully", department));
});

// 3. delete department
export const deleteDepartment = AsyncHandler(async (req, res) => {
  const { deptId } = req.params;

  const existingDepartment = await Department.findById(deptId);
  if (!existingDepartment) throw new ApiError(400, "No Such Department Exists");

  const department = await Department.findByIdAndUpdate(deptId, {
    $set: { isActive: !existingDepartment.isActive }
  },{new:true});

  res
    .status(200)
    .send(new ApiSuccess(200, "Department Deleted Successfully", department));
});

// 4. get all department
export const getAllDepartment = AsyncHandler(async (req,res)=>{
    // const query = req.user.role === "admin" ? {} : {isActive : true};

    const department = await Department.find();
    res.status(200).send(new ApiSuccess(200,"Department Fetched Successfully",department))
});