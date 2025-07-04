import express from "express";

import { verifyJWT } from "../middlewares/Auth.middleware.js";
import {
  addPlace,
  deletePlace,
  getAllPlace,
  getSinglePlace,
  updatePlace,
} from "../controller/Place.controller.js";

const router = express.Router();

router.route("/").get(getAllPlace).post(addPlace);

router.route("/:id").get(getSinglePlace).patch(updatePlace).delete(deletePlace);

export default router;
