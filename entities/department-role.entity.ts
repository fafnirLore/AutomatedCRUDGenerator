import { IsOptional, IsNumber, IsString } from 'class-validator';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { BusinessRole } from 'src/business-roles/entities/business-role.entity';
import { Department } from 'src/department/entities/department.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('department_roles')
export class DepartmentRole {
  @PrimaryGeneratedColumn({ name: 'department_role_id' })
  @IsOptional()
  @IsNumber()
  departmentRoleId?: number;

  @Column({ name: 'parent_department_role_id', nullable: true, default: 0 })
  @IsOptional()
  @IsNumber()
  parentDepartmentRoleId?: number;

  @Column({ name: 'dml_status', nullable: true })
  @IsOptional()
  @IsNumber()
  dmlStatus?: number;

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

  @Column({ name: 'user_id', nullable: true })
  @IsOptional()
  @IsNumber()
  userId?: number;

  @Column({ name: 'client_id' })
  @IsNumber()
  @IsOptional()
  clientId?: number;

  @ManyToOne(() => Department, (Department) => Department.departmentId)
  @JoinColumn({ name: 'department_id' })
  @Column({ name: 'department_id' })
  @IsNumber()
  @IsOptional()
  departmentId: number;

  @ManyToOne(() => BusinessRole, (BusinessRole) => BusinessRole.businessRoleId)
  @JoinColumn({ name: 'business_role_id' })
  @Column({ name: 'business_role_id' })
  @IsNumber()
  @IsOptional()
  businessRoleId: number;

  @ManyToOne(
    () => DepartmentRole,
    (DepartmentRole) => DepartmentRole.departmentRoleId,
  )
  @JoinColumn({ name: 'root_department_role_id' })
  @Column({ name: 'root_department_role_id' })
  @IsNumber()
  @IsOptional()
  rootDepartmentRoleId: number;
}

export const jsonSchemas = validationMetadatasToSchemas();
