import { Request, Response } from "express";
import * as asyncHandler from "express-async-handler";
import { Grade } from "../entity/Grade";
import { dataSource } from "../config/connnection";

const getGrades = asyncHandler(async (req: Request, res: Response) => {
  const page = parseInt(req.params.page) || 1;
  const limit = parseInt(req.params.limit) || 10;
  const gradesRepository = dataSource.getRepository(Grade);
  const count = await gradesRepository.count();
  const grades = await gradesRepository.find({
    skip: (page - 1) * limit,
    take: limit,
  });
  if (grades.length) {
    res.json({
      result: grades,
      currentPage: page,
      totalPages: Math.ceil(count / limit),
      totalGrades: count,
    });
  } else {
    res.status(200).json({ result: [], message: "No grades found" });
  }
});

const getGrade = asyncHandler(async (req: Request, res: Response) => {
  const { gradesId } = req.params;
  const grades = await dataSource.getRepository(Grade).findOneBy({
    grade_id: parseInt(gradesId),
  });
  if (grades) {
    res.json({
      grades,
      message: "success",
    });
  } else {
    res.status(404);
    throw new Error("Grade not found");
  }
});

const createGrade = asyncHandler(async (req: Request, res: Response) => {
  const { course, student, letter_grade, academic_period } = req.body;

  if (!course) {
    res.status(400);
    throw new Error("Please provide a valid course");
  }

  if (!student) {
    res.status(400);
    throw new Error("Please provide a valid student");
  }

  if (!letter_grade) {
    res.status(400);
    throw new Error("Please provide a valid grade");
  }
  if (!academic_period) {
    res.status(400);
    throw new Error("Please provide a valid academic year");
  }

  const check = await dataSource.getRepository(Grade).find({
    where: {
      course: course,
      student: student,
      academic_period: academic_period,
    },
  });
  if (check) {
    res.status(409);
    throw new Error("grades exists");
  }

  const gradesRepository = dataSource.getRepository(Grade);
  const newGrade = gradesRepository.create({
    course,
    student,
    letter_grade,
    academic_period,
  });
  const savedGrade = await gradesRepository.save(newGrade);

  res.status(201).json({
    message: "Grade created successfully",
    grades: savedGrade,
  });
});

const deleteGrade = asyncHandler(async (req: Request, res: Response) => {
  const gradesId = parseInt(req.params.gradesId);
  const gradesRepository = dataSource.getRepository(Grade);

  // Find the grades by ID
  const grades = await dataSource.getRepository(Grade).findOneBy({
    grade_id: gradesId,
  });

  // Check if the grades exists
  if (!grades) {
    res.status(404);
    throw new Error("Grade not found");
  }

  // Remove the grades
  await gradesRepository.remove(grades);

  res.json({ message: "Grade deleted successfully" });
});

const updateGrade = asyncHandler(async (req: Request, res: any) => {
  const gradesId = parseInt(req.params.gradesId); // Assuming gradesId is a number
  const { course, student, letter_grade, academic_period } = req.body;
  const gradesRepository = dataSource.getRepository(Grade);

  // Find the grades by ID
  const grades = await dataSource.getRepository(Grade).findOneBy({
    grade_id: gradesId,
  });
  if (!grades) {
    return res.status(404).json({ message: "Grade doesn't exist" });
  }

  // Update the grades

  grades.course = course;
  grades.student = student;
  grades.academic_period = academic_period;
  grades.letter_grade = letter_grade;

  // Save the updated grades to the database
  const updatedGrade = await gradesRepository.save(grades);

  res.status(200).json({
    message: "Grade was updated successfully",
    grades: updatedGrade,
  });
});

export { getGrades, getGrade, createGrade, deleteGrade, updateGrade };
