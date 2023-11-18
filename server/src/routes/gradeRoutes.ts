import * as express from "express";

import {
  getGrades,
  getGrade,
  createGrade,
  deleteGrade,
  updateGrade,
} from "../controller/gradeController";
import { protect } from "../middleware/auth";

const router = express.Router();

router.get("/:page/:limit", getGrades);
router.get("/:gradeId", protect, getGrade);
router.post("/", createGrade);
router.delete("/:gradeId", protect, deleteGrade);
router.put("/:gradeId", protect, updateGrade);

export default router;
