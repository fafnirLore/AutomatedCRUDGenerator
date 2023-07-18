import { IsOptional, IsNumber, IsString } from 'class-validator';

import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    OneToOne,
} from 'typeorm';

@Entity('student')
export class Student {
    @PrimaryGeneratedColumn({ name: 'student_id' })
    @IsNumber()
    @IsOptional()
    studentId?: number;

    @Column({ name: 'student_name' })
    @IsOptional()
    @IsString()
    studentName?: string;

    @OneToMany(() => CourseStudent, (cs) => cs.studentId)
    @JoinColumn({ name: 'course_student_id' })
    @Column({ nullable: true, name: 'course_student_id', type: 'integer' })
    @IsOptional()
    courseStudentId: CourseStudent[];

    @OneToOne(() => DepartmentStudent, (ds) => ds.studentId)
    @JoinColumn({ name: 'department_course_id' })
    @Column({ nullable: true, name: 'department_course_id', type: 'integer' })
    @IsOptional()
    departmentStudentId: DepartmentStudent;

    @Column({ name: 'dml_username' })
    dmlUsername: string;
    @Column({ name: 'dml_user_id' })
    dmlUserId: number;
    @Column({ name: 'dml_status' })
    dmlStatus: number;
    @Column({ name: 'dml_timestamps', type: 'date' })
    dmlTimestamps: Date;
}