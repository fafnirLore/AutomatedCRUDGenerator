import { IsOptional, IsNumber, IsString } from 'class-validator';

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('course_student')
export class CourseStudent {
  @PrimaryGeneratedColumn({ name: 'course_student_id' })
  @IsNumber()
  @IsOptional()
  courseStudentId?: number;


  @ManyToOne(() => Student, (s) => s.courseStudentId)
  @Column({ name: 'student_id', type: "integer" })
  studentId: Student;

  @ManyToOne(() => Course, (c) => c.courseStudentId)
  @Column({ name: 'course_id', type: "integer" })
  courseId: Course;

  @Column({ name: 'dml_status' })
  dmlStatus: number;
  @Column({ name: 'dml_username' })
  dmlUsername: string;
  @Column({ name: 'dml_user_id' })
  dmlUserId: number;
  @Column({ name: 'dml_timestamps', type: 'date' })
  dmlTimestamps: Date;
}