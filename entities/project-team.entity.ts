import { IsOptional, IsNumber, IsString } from 'class-validator';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { BusinessRole } from 'src/business-roles/entities/business-role.entity';
import { DepartmentRole } from 'src/department-role/entities/department-role.entity';
import { Department } from 'src/department/entities/department.entity';
import { UserTypeLov } from 'src/user-type-lov/entities/user-type-lov.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('project_team')
export class ProjectTeam {
  @PrimaryGeneratedColumn({ name: 'project_team_id' })
  @IsOptional()
  @IsNumber()
  projectTeamId?: number;

  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  title?: string;

 
  @Column({ name: 'dml_status', nullable: true })
  @IsOptional()
  @IsNumber()
  dmlStatus?: number;

  @Column({ name: 'dml_user_id', nullable: true })
  @IsOptional()
  @IsNumber()
  dmlUserId?: number;



  @Column({ type: 'timestamptz', name: 'insertion_timestamp', nullable: true })
  @IsOptional()
  @IsString()
  insertionTimestamp?: string;

  @Column({
    type: 'timestamptz',
    nullable: true,
    name: 'close_timestamp',
  })
  @IsOptional()
  @IsString()
  closeTimeStamp?: string;

  @Column({ name: 'parent_project_team_id' })
  @IsNumber()
  @IsOptional()
  parentProjectTeamId?: number;

  @Column({ name: 'client_id' })
  @IsNumber()
  @IsOptional()
  clientId?: number;

  @ManyToOne(() => BusinessRole, (BusinessRole) => BusinessRole.businessRoleId)
  @JoinColumn({ name: 'business_role_id' })
  @Column({ name: 'business_role_id' })
  @IsNumber()
  @IsOptional()
  businessRoleId: number;

  @ManyToOne(() => Department, (Department) => Department.departmentId)
  @JoinColumn({ name: 'department_id' })
  @Column({ name: 'department_id' })
  @IsNumber()
  @IsOptional()
  departmentId: number;

  @ManyToOne(
    () => DepartmentRole,
    (DepartmentRole) => DepartmentRole.departmentRoleId,
  )
  @JoinColumn({ name: 'department_role_id' })
  @Column({ name: 'department_role_id' })
  @IsNumber()
  @IsOptional()
  departmentRoleId: number;



  @ManyToOne(() => ProjectTeam, (ProjectTeam) => ProjectTeam.projectTeamId)
  @JoinColumn({ name: 'root_id' })
  @Column({ name: 'root_id' })
  @IsNumber()
  @IsOptional()
  rootId: number;

  @ManyToOne(() => UserTypeLov, (UserTypeLov) => UserTypeLov.userTypeLovId)
  @JoinColumn({ name: 'user_type_lov_id' })
  @Column({ name: 'user_type_lov_id' })
  @IsNumber()
  @IsOptional()
  userTypeLovId: number;

  @ManyToOne(() => User, (User) => User.userId)
  @JoinColumn({ name: 'team_member_id' })
  @Column({ name: 'team_member_id' })
  @IsNumber()
  @IsOptional()
  teamMemberId: number;


}

export const jsonSchemas = validationMetadatasToSchemas();
