import { IsNumber, IsOptional, IsString } from 'class-validator';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { ApplicationRole } from 'src/application-roles/entities/application-role.entity';
import { BusinessRole } from 'src/business-roles/entities/business-role.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('business_application_role')
export class BusinessApplicationRole {
  @IsNumber()
  @IsOptional()
  @PrimaryGeneratedColumn({ name: 'application_business_role_id' })
  businessApplicationRoleId?: number;


  @IsOptional()
  @IsNumber()
  @Column({ name: 'dml_status' })
  dmlStatus?: number;


  @IsOptional()
  @IsString()
  @Column({ name: 'insertion_timestamps', type: 'timestamptz' })
  insertionTimestamps?: string;

  @IsOptional()
  @IsString()
  @Column({ name: 'close_timestamps', type: 'timestamptz' })
  closeTimestamps?: string;

  @IsNumber()
  @IsOptional()
  @Column({ name: 'user_id' })
  userId?: number;

  @IsNumber()
  @IsOptional()
  @Column({ name: 'project_id' })
  projectId?: number;

  @IsNumber()
  @IsOptional()
  @Column({ name: 'client_id' })
  clientId?: number;

  @ManyToOne(
    () => ApplicationRole,
    (ApplicationRole) => ApplicationRole.applicationRoleId,
  )
  @JoinColumn({ name: 'application_role_id' })
  @Column({ name: 'application_role_id' })
  applicationRoleId: number;

  @ManyToOne(() => BusinessRole, (BusinessRole) => BusinessRole.businessRoleId)
  @JoinColumn({ name: 'business_role_id' })
  @Column({ name: 'business_role_id' })
  businessRoleId: number;

  @ManyToOne(
    () => BusinessApplicationRole,
    (BusinessApplicationRole) => BusinessApplicationRole.businessApplicationRoleId,
  )
  @JoinColumn({ name: 'root_id' })
  @Column({ name: 'root_id' })
  @IsNumber()
  @IsOptional()
  rootId: number;
}

export const jsonSchemas = validationMetadatasToSchemas();
