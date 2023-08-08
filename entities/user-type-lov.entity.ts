import { IsOptional, IsNumber, IsString } from 'class-validator';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user_type_lov')
export class UserTypeLov {
  @PrimaryGeneratedColumn({ name: 'user_type_lov_id' })
  @IsOptional()
  @IsNumber()
  userTypeLovId?: number;

  @IsOptional()
  @IsString()
  @Column({ name: 'insertion_timestamp', type: 'timestamptz' })
  insertionTimestamp?: string;

  @IsOptional()
  @IsString()
  @Column({ name: 'close_timestamp', type: 'timestamptz' })
  closeTimestamp?: string;

  @IsOptional()
  @IsNumber()
  @Column({ name: 'dml_status' })
  dmlStatus?: number;

  @Column({ name: 'dml_user_id', nullable: true })
  @IsOptional()
  @IsNumber()
  dmlUserId?: number;


  @Column({ name: 'name', nullable: true })
  @IsOptional()
  @IsString()
  name?: string;

  @Column({ name: 'description', nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @ManyToOne(() => UserTypeLov, (UserTypeLov) => UserTypeLov.userTypeLovId)
  @JoinColumn({ name: 'root_id' })
  @Column({ name: 'root_id' })
  @IsNumber()
  @IsOptional()
  rootId: number;
}
export const jsonSchemas = validationMetadatasToSchemas();
