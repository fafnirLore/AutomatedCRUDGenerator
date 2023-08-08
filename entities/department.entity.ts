import { IsOptional, IsNumber, IsString } from 'class-validator';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
// import { Client } from 'src/client/entities/client.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('department')
export class Department {
  @PrimaryGeneratedColumn({ name: 'department_id' })
  @IsOptional()
  @IsNumber()
  departmentId?: number;

  @Column({ name: 'parent_department_id', default: 0 })
  @IsOptional()
  @IsNumber()
  parentDepartmentId?: number;

  @Column({ type: 'timestamptz', name: 'insertion_timestamp', nullable: true })
  @IsOptional()
  @IsString()
  insertionTimeStamp?: string;

  @Column({
    type: 'timestamptz',
    nullable: true,
    name: 'close_timestamp',
  })
  @IsOptional()
  @IsString()
  closeTimeStamp?: string;

  @Column({ name: 'dml_status', nullable: true })
  @IsOptional()
  @IsNumber()
  dmlStatus?: number;

  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  title?: string;

  @Column({ name: 'description', nullable: true })
  @IsString()
  @IsOptional()
  description?: string;



  @ManyToOne(() => Department, (Department) => Department.departmentId)
  @JoinColumn({ name: 'root_department_id' })
  @Column({ name: 'root_department_id' })
  @IsNumber()
  @IsOptional()
  rootDepartmentId: number;


  @Column({ name: 'object_type_id', nullable: true })
  @IsNumber()
  @IsOptional()
  objectTypeId?: number;
}

export const jsonSchemas = validationMetadatasToSchemas();
