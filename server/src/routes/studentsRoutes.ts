import * as express from "express";

import { getStudents } from "../controller/studentsController";

const router = express.Router();

router.get("/:page/:limit", getStudents);

export default router;
