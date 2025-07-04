import express from "express"
import { addUsers, allUsers, deleteUsers, editUsers } from "../controller/Users.controller.js";

const router = express.Router();

router.route("/").get(allUsers).post(addUsers)
router.route("/:id").patch(editUsers).delete(deleteUsers)

export default router;