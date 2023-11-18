import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  UpdateDateColumn,
  Column,
} from "typeorm";
import { Grade } from "./Grade";

@Entity()
export class GradeDetail {
  @PrimaryGeneratedColumn()
  grade_detail_id: number;

  @ManyToOne(() => Grade, (grade) => grade.grade_id)
  grade: Grade;

  @Column({ length: 1 })
  letter_grade: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updated_at: Date;
}
