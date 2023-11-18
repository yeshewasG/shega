import {
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  Column,
} from "typeorm";
import { Course } from "./Course";
import { Student } from "./Student";

@Entity()
export class Grade {
  @PrimaryGeneratedColumn()
  grade_id: number;

  @ManyToOne(() => Course, (course) => course.enrollments)
  course: Course;

  @ManyToOne(() => Student, (student) => student.enrollments)
  student: Student;

  @Column({ length: 1 })
  letter_grade: string;

  @Column({ length: 20 })
  academic_period: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updated_at: Date;
}
