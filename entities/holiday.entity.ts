import { IsOptional, IsNumber, IsString } from 'class-validator';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';


import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('holidays')
export class Holiday {
  @PrimaryGeneratedColumn({ name: 'holidays_id' })
  @IsOptional()
  @IsNumber()
  holidayId?: number;

  @Column({ type: 'timestamptz', name: 'date', nullable: true })
  @IsOptional()
  @IsString()
  date?: string;

  @Column({ name: 'description', nullable: true })
  @IsString()
  @IsOptional()
  description?: string;

  @Column({ name: 'dml_status', nullable: true })
  @IsOptional()
  @IsNumber()
  dmlStatus?: number;

}

export const jsonSchemas = validationMetadatasToSchemas();
