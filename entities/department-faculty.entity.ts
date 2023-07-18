import { IsOptional, IsNumber, IsString } from 'class-validator';

import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('department_faculty')
export class DepartmentFaculty {
    @PrimaryGeneratedColumn({ name: 'department_faculty_id' })
    @IsNumber()
        @IsOptional()
    departmentFacultyId?: number;


    @ManyToOne(() => Faculty, (f) => f.departmentFacultyId)
    @Column({ name: 'faculty_id' ,type:"integer"})
    facultyId: Faculty;

    @ManyToOne(() => Department, (d) => d.departmentFacultyId)
    @Column({ name: 'department_id',type:"integer" })
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