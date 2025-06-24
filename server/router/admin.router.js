import express from "express";
import {
  addDepartment,
  deleteDepartment,
  editDepartment,
  getAllDepartment,
} from "../controllers/department.controller";

const router = express.Router();

router.route("/department").get(getAllDepartment).post(addDepartment);
router
  .route("/department/deptId")
  .patch(editDepartment)
  .delete(deleteDepartment);


router.route("/state").get().post()  
router.route("/state/:stateId").patch().delete()  

router.route("/district").get().post()  
router.route("/district/:districtId").patch().delete()  
export default router;
