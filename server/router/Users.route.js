import express from "express";
import {
  addUsers,
  allUsers,
  deleteUsers,
  editUsers,
} from "../controller/Users.controller.js";
import { verifyAdmin, verifyJWT } from "../middlewares/Auth.middleware.js";

const router = express.Router();

router
  .route("/")
  .get(verifyJWT, verifyAdmin, allUsers)
  .post(verifyJWT, verifyAdmin, addUsers);
router
  .route("/:id")
  .patch(verifyJWT, verifyAdmin, editUsers)
  .delete(verifyJWT, verifyAdmin, deleteUsers);

export default router;
