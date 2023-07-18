import { IsOptional, IsNumber, IsString } from 'class-validator';

import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('faculty')
export class Faculty {
    @PrimaryGeneratedColumn({ name: 'faculty_id' })
    @IsNumber()
    @IsOptional()
    facultyId?: number;

    @Column({ name: 'faculty_name' })
    @IsString()
    facultyName?: string;

    @OneToMany(() => CourseFaculty, (cf) => cf.facultyId)
    @JoinColumn({ name: 'course_faculty_id' })
    @Column({ nullable: true, name: 'course_faculty_id', type: 'integer' })
    courseFacultyId: CourseFaculty[];

    @OneToMany(() => DepartmentFaculty, (df) => df.facultyId)
    @JoinColumn({ name: 'department_faculty_id' })
    @Column({ nullable: true, name: 'department_course_id', type: 'integer' })
    departmentCourseId: DepartmentFaculty[];


    @Column({ name: 'dml_status' })
    dmlStatus: number;
    @Column({ name: 'dml_username' })
    dmlUsername: string;
    @Column({ name: 'dml_user_id' })
    dmlUserId: number;
    @Column({ name: 'dml_timestamps', type: 'date' })
    dmlTimestamps: Date;
}