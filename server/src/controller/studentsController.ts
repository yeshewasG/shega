import { Request, Response } from "express";
import * as asyncHandler from "express-async-handler";
import { Student } from "../entity/Student";
import { dataSource } from "../config/connnection";

const getStudents = asyncHandler(async (req: Request, res: Response) => {
  const page = parseInt(req.params.page) || 1;
  const limit = parseInt(req.params.limit) || 10;
  const studentsRepository = dataSource.getRepository(Student);
  const count = await studentsRepository.count();
  const students = await studentsRepository.find({
    skip: (page - 1) * limit,
    take: limit,
  });
  if (students.length) {
    res.json({
      result: students,
      currentPage: page,
      totalPages: Math.ceil(count / limit),
      totalStudents: count,
    });
  } else {
    res.status(200).json({ result: [], message: "No course found" });
  }
});

export { getStudents };
