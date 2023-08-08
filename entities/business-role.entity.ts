import { IsNumber, IsOptional, IsString } from 'class-validator';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('business_roles')
export class BusinessRole {
  @IsNumber()
  @IsOptional()
  @PrimaryGeneratedColumn({ name: 'business_roles_id' })
  businessRoleId?: number;

  @IsString()
  @IsOptional()
  @Column({ name: 'title' })
  title?: string;

  @IsOptional()
  @IsNumber()
  @Column({ name: 'dml_status' })
  dmlStatus?: number;

  @IsOptional()
  @IsString()
  @Column({ name: 'insertion_timestamps', type: 'timestamptz' })
  insertionTimeStamps?: string;

  @IsOptional()
  @IsString()
  @Column({ name: 'close_timestamps', type: 'timestamptz' })
  closeTimestamps?: string;

  @IsNumber()
  @IsOptional()
  @Column({ name: 'user_id' })
  userId?: number;

  @IsString()
  @IsOptional()
  @Column({ name: 'type' })
  type?: string;

  @IsNumber()
  @IsOptional()
  @Column({ name: 'project_id', default: 0 })
  projectId?: number;

  @IsString()
  @IsOptional()
  @Column({ name: 'description' })
  description?: string;

  @IsNumber()
  @IsOptional()
  @Column({ name: 'client_id' })
  clientId?: number;

  @ManyToOne(() => BusinessRole, (BusinessRole) => BusinessRole.businessRoleId)
  @JoinColumn({ name: 'root_id' })
  @Column({ name: 'root_id' })
  @IsNumber()
  @IsOptional()
  rootId: number;
}

export const jsonSchemas = validationMetadatasToSchemas();
