import * as express from "express";

import {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
} from "../controller/userController";
import { protect } from "../middleware/auth";

const router = express.Router();

router.get("/:page/:limit", getUsers);
router.get("/:UserId", protect, getUser);
router.post("/", protect, createUser);
router.delete("/:UserId", protect, deleteUser);
router.put("/:UserId", protect, updateUser);

export default router;
