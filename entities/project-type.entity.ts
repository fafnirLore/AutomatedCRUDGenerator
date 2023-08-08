import { IsOptional, IsNumber, IsString } from 'class-validator';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('project_type')
export class ProjectType {
  @PrimaryGeneratedColumn({ name: 'project_type_id' })
  @IsOptional()
  @IsNumber()
  projectTypeId?: number;

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

  @Column({ name: 'user_id' })
  @IsNumber()
  @IsOptional()
  userId?: number;

  @ManyToOne(() => ProjectType, (ProjectType) => ProjectType.projectTypeId)
  @JoinColumn({ name: 'root_project_type_id' })
  @Column({ name: 'root_project_type_id' })
  @IsNumber()
  @IsOptional()
  rootProjectTypeId: number;
}
export const jsonSchemas = validationMetadatasToSchemas();
