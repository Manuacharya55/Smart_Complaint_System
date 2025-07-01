import express from "express";
import {
  addDepartment,
  deleteDepartment,
  editDepartment,
  getAllDepartment,
} from "../controllers/department.controller.js";
import { addDistrict, addState, deleteDistrict, deleteState, editDistrict, editState, getAllDistrict, getAllState } from "../controllers/places.controller.js";

const router = express.Router();

router.route("/department").get(getAllDepartment).post(addDepartment);
router
  .route("/department/:deptId")
  .patch(editDepartment)
  .delete(deleteDepartment);


router.route("/state").get(getAllState).post(addState)  
router.route("/state/:stateId").patch(editState).delete(deleteState)  

router.route("/district").get(getAllDistrict).post(addDistrict)  
router.route("/district/:districtId").patch(editDistrict).delete(deleteDistrict)  
export default router;
