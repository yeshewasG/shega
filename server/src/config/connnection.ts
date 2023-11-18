import { DataSource } from "typeorm";

import { Course } from "../entity/Course";
import { Enrollment } from "../entity/Enrollment";
import { Grade } from "../entity/Grade";
import { GradeDetail } from "../entity/GradeDetail";
import { Student } from "../entity/Student";
import { User } from "../entity/User";

// const dbHost = process.env.DB_HOST;
// const dbPort = process.env.DB_PORT;
// const dbUSer = process.env.DB_USER;
// const dbPass = process.env.DB_PASS;
// const dbName = process.env.DB_NAME;
export const dataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "shega_college",
  entities: ["src/entity/*.ts"],
  logging: true,
  synchronize: true,
});

export function connectDb() {
  dataSource
    .initialize()
    .then(() => {
      handleTestData();
      console.log("Data Source has been initialized!");
    })
    .catch((err) => {
      console.error("Error during Data Source initialization:", err);
    });
}

const handleTestData = async () => {
  const coursesRepository = dataSource.getRepository(Course);
  const courseCount = await coursesRepository.count();
  // Create test data for Course if it doesn't exist
  let course = new Course();
  if (courseCount == 0) {
    course.title = "Test Course";
    course.course_code = "CS101";
    course.description = "This is a test course.";
    course.credit_hours = 3;

    await coursesRepository.manager.save(course);
  }
  const studentRepository = dataSource.getRepository(Student);
  const studentCount = await studentRepository.count();
  // Create test data for Student if it doesn't exist
  let student = new Student();
  if (studentCount == 0) {
    student.name = "Jon Doe";
    student.contact_details = "jon@doe.com";
    await studentRepository.manager.save(student);
  }
  const enrollmentRepository = dataSource.getRepository(Enrollment);
  const enrollmentCount = await enrollmentRepository.count();
  // Create test data for Student if it doesn't exist
  if (enrollmentCount == 0) {
    const enrollment = new Enrollment();
    enrollment.course = course;
    enrollment.student = student;
    await studentRepository.manager.save(enrollment);
  }
};
