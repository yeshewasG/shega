import { Request, Response } from "express";
import * as asyncHandler from "express-async-handler";
import { Course } from "../entity/Course";
import { dataSource } from "../config/connnection";

const getCourses = asyncHandler(async (req: Request, res: Response) => {
  const page = parseInt(req.params.page) || 1;
  const limit = parseInt(req.params.limit) || 10;
  const coursesRepository = dataSource.getRepository(Course);
  const count = await coursesRepository.count();
  const courses = await coursesRepository.find({
    skip: (page - 1) * limit,
    take: limit,
  });
  if (courses.length) {
    res.json({
      result: courses,
      currentPage: page,
      totalPages: Math.ceil(count / limit),
      totalCourses: count,
    });
  } else {
    res.status(200).json({ result: [], message: "No course found" });
  }
});

const getCourse = asyncHandler(async (req: Request, res: Response) => {
  const { coursesId } = req.params;
  const courses = await dataSource.getRepository(Course).findOneBy({
    course_id: parseInt(coursesId),
  });
  if (courses) {
    res.json({
      courses,
      message: "success",
    });
  } else {
    res.status(404);
    throw new Error("Course not found");
  }
});

const createCourse = asyncHandler(async (req: Request, res: Response) => {
  const { title, course_code, description, credit_hours } = req.body;

  if (!title) {
    res.status(400);
    throw new Error("Please provide a valid Title");
  }

  if (!course_code) {
    res.status(400);
    throw new Error("Please provide a valid Course code");
  }

  if (!description) {
    res.status(400);
    throw new Error("Please provide a valid description");
  }
  if (!credit_hours) {
    res.status(400);
    throw new Error("Please provide a valid Credit hours");
  }

  const check = await dataSource.getRepository(Course).findOneBy({
    course_code: course_code,
  });
  if (check) {
    res.status(409);
    throw new Error("courses exists");
  }

  const coursesRepository = dataSource.getRepository(Course);
  const newCourse = coursesRepository.create({
    title,
    course_code,
    description,
    credit_hours,
  });
  const savedCourse = await coursesRepository.save(newCourse);

  res.status(201).json({
    message: "Course created successfully",
    courses: savedCourse,
  });
});

const deleteCourse = asyncHandler(async (req: Request, res: Response) => {
  const coursesId = parseInt(req.params.coursesId);
  const coursesRepository = dataSource.getRepository(Course);

  // Find the courses by ID
  const courses = await dataSource.getRepository(Course).findOneBy({
    course_id: coursesId,
  });

  // Check if the courses exists
  if (!courses) {
    res.status(404);
    throw new Error("Course not found");
  }

  // Remove the courses
  await coursesRepository.remove(courses);

  res.json({ message: "Course deleted successfully" });
});

const updateCourse = asyncHandler(async (req: Request, res: any) => {
  const coursesId = parseInt(req.params.coursesId); // Assuming coursesId is a number
  const { title, course_code, description, credit_hours } = req.body;
  const coursesRepository = dataSource.getRepository(Course);

  // Check if a courses with the given name already exists
  const existingCourse = await coursesRepository.findOne({
    where: { course_code },
  });
  if (existingCourse && existingCourse.course_id !== coursesId) {
    return res
      .status(400)
      .json({ message: "Course with this course code already exists" });
  }

  // Find the courses by ID
  const courses = await dataSource.getRepository(Course).findOneBy({
    course_id: coursesId,
  });
  if (!courses) {
    return res.status(404).json({ message: "Course doesn't exist" });
  }

  // Update the courses

  courses.title = title;
  courses.course_code = course_code;
  courses.description = description;
  courses.credit_hours = credit_hours;

  // Save the updated courses to the database
  const updatedCourse = await coursesRepository.save(courses);

  res.status(200).json({
    message: "Course was updated successfully",
    courses: updatedCourse,
  });
});

export { getCourses, getCourse, createCourse, deleteCourse, updateCourse };
