import express from "express";

import { verifyJWT } from "../middlewares/Auth.middleware.js";
import {
  addDepartment,
  deleteDepartment,
  getAllDepartment,
  getSingleDepartment,
  updateDepartment,
} from "../controller/Department.controller.js";

const router = express.Router();

router.route("/").get(getAllDepartment).post(addDepartment);

router
  .route("/:id")
  .get(getSingleDepartment)
  .patch(updateDepartment)
  .delete(deleteDepartment);

export default router;
