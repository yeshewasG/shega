import {
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
  Unique,
  OneToMany,
} from "typeorm";
import { Enrollment } from "./Enrollment";
@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  course_id: number;

  @Column()
  title: string;

  @Column({ unique: true }) // This also ensures uniqueness at the database level
  course_code: string;

  @Column("text")
  description: string;

  @Column("int")
  credit_hours: number;

  @OneToMany(() => Enrollment, (enrollment) => enrollment.course)
  enrollments: Enrollment[];

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updated_at: Date;
}
