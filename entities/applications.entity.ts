import { IsNumber, IsOptional, IsString } from 'class-validator';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
// import { Project } from 'src/project/entities/project.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('applications')
export class Applications {
  @IsNumber()
  @IsOptional()
  @PrimaryGeneratedColumn({ name: 'application_id' })
  applicationsId?: number;

  @IsString()
  @IsOptional()
  @Column({ name: 'title' })
  title?: string;

  @IsOptional()
  @IsNumber()
  @Column({ name: 'dml_status' })
  dmlStatus?: number;

  @IsNumber()
  @IsOptional()
  @Column({ name: 'user_id' })
  userId?: number;

  @IsOptional()
  @IsString()
  @Column({ name: 'insertion_timestamps', type: 'timestamptz' })
  insertionTimestamps?: string;

  @IsOptional()
  @IsString()
  @Column({ name: 'close_timestamps', type: 'timestamptz' })
  closeTimestamps?: string;

  @IsString()
  @IsOptional()
  @Column({ name: 'app_url' })
  frontendURL?: string;

  @IsNumber()
  @IsOptional()
  @Column({ name: 'client_id' })
  clientId?: number;

  @IsString()
  @IsOptional()
  @Column({ name: 'short_name' })
  code?: string;

  @IsString()
  @IsOptional()
  @Column({ name: 'ip_address' })
  backendURL?: string;

  @IsString()
  @IsOptional()
  @Column({ name: 'application_icon' })
  applicationIcon?: string;

  @IsNumber()
  @IsOptional()
  @Column({ name: 'sort' })
  sort?: number;

  @IsString()
  @IsOptional()
  @Column({ name: 'config_json' })
  configJson?: string;



  @ManyToOne(() => Applications, (Applications) => Applications.applicationsId)
  @JoinColumn({ name: 'root_id' })
  @Column({ name: 'root_id' })
  @IsNumber()
  @IsOptional()
  rootId: number;
}

export const jsonSchemas = validationMetadatasToSchemas();
