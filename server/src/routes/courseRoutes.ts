import * as express from "express";

import {
  getCourses,
  getCourse,
  createCourse,
  deleteCourse,
  updateCourse,
} from "../controller/courseController";
import { protect } from "../middleware/auth";

const router = express.Router();

router.get("/:page/:limit", getCourses);
router.get("/:CourseId", getCourse);
router.post("/", createCourse);
router.delete("/:CourseId", protect, deleteCourse);
router.put("/:CourseId", protect, updateCourse);

export default router;
