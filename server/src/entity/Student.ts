import {
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
  OneToMany,
} from "typeorm";
import { Enrollment } from "./Enrollment";

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  student_id: number;

  @Column({ length: 50 })
  name: string;

  @Column("text")
  contact_details: string;

  @OneToMany(() => Enrollment, (enrollment) => enrollment.student)
  enrollments: Enrollment[];

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updated_at: Date;
}
