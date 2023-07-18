import { IsOptional, IsNumber, IsString } from 'class-validator';

import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('department_student')
export class DepartmentStudent {
    @PrimaryGeneratedColumn({ name: 'department_student_id' })
    @IsNumber()
    @IsOptional()
    departmentStudentId?: number;


    @ManyToOne(() => Student, (s) => s.departmentStudentId)
    @Column({ name: 'student_id', type: "integer" })
    studentId: Student;

    @ManyToOne(() => Department, (d) => d.departmentStudentId)
    @Column({ name: 'department_id', type: "integer" })
    departmentId: Department;

    @Column({ name: 'dml_status' })
    dmlStatus: number;
    @Column({ name: 'dml_username' })
    dmlUsername: string;
    @Column({ name: 'dml_user_id' })
    dmlUserId: number;
    @Column({ name: 'dml_timestamps', type: 'date' })
    dmlTimestamps: Date;
}