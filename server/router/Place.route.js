import express from "express";

import { verifyAdmin, verifyJWT } from "../middlewares/Auth.middleware.js";
import {
  addPlace,
  deletePlace,
  getAllPlace,
  getSinglePlace,
  updatePlace,
} from "../controller/Place.controller.js";


const router = express.Router();

router
  .route("/")
  .get(verifyJWT,getAllPlace)
  .post(verifyJWT, verifyAdmin, addPlace);

router
  .route("/:id")
  .get(verifyJWT, verifyAdmin, getSinglePlace)
  .patch(verifyJWT, verifyAdmin, updatePlace)
  .delete(verifyJWT, verifyAdmin, deletePlace);

export default router;
