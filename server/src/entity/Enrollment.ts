import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  UpdateDateColumn,
} from "typeorm";
import { Course } from "./Course";
import { Student } from "./Student";

@Entity()
export class Enrollment {
  @PrimaryGeneratedColumn()
  enrollment_id: number;

  @ManyToOne(() => Course, (course) => course.enrollments)
  course: Course;

  @ManyToOne(() => Student, (student) => student.enrollments)
  student: Student;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updated_at: Date;
}
