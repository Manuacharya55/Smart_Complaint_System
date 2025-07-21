import express from "express";

import { verifyAdmin, verifyJWT } from "../middlewares/Auth.middleware.js";
import {
  addDepartment,
  deleteDepartment,
  getAllDepartment,
  getSingleDepartment,
  updateDepartment,
} from "../controller/Department.controller.js";

const router = express.Router();

router.route("/").get(verifyJWT,getAllDepartment).post(verifyJWT,verifyAdmin,addDepartment);

router
  .route("/:id")
  .get(verifyJWT,verifyAdmin,getSingleDepartment)
  .patch(verifyJWT,verifyAdmin,updateDepartment)
  .delete(verifyJWT,verifyAdmin,deleteDepartment);

export default router;
