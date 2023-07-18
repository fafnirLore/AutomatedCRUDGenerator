import { IsOptional, IsNumber, IsString } from 'class-validator';

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';


@Entity('course_faculty')
export class CourseFaculty {
  @PrimaryGeneratedColumn({ name: 'course_faculty_id' })
  @IsNumber()
  @IsOptional()
  courseFacultyId?: number;

  @ManyToOne(() => Faculty, (f) => f.courseFacultyId)
  @Column({ name: 'faculty_id', type: "integer" })
  facultyId: Faculty;

  @ManyToOne(() => Course, (c) => c.courseFacultyId)
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

