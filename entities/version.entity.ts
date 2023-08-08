import { IsOptional, IsNumber, IsString } from 'class-validator';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
// import { Project } from 'src/project/entities/project.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('version')
export class Version {
  @PrimaryGeneratedColumn({ name: 'version_id' })
  @IsOptional()
  @IsNumber()
  versionId?: number;

  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  title?: string;

  @Column({ name: 'major_version', nullable: true })
  @IsOptional()
  @IsNumber()
  majorVersion?: number;

  @Column({ name: 'minor_version', nullable: true })
  @IsOptional()
  @IsNumber()
  minorVersion?: number;

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

  @Column({ name: 'old_version_id', nullable: true })
  @IsOptional()
  @IsNumber()
  oldVersionId?: number;

  @Column({ type: 'timestamptz', name: 'version_timestamp', nullable: true })
  @IsOptional()
  @IsString()
  versionTimeStamp?: string;

  @Column({ name: 'copy_status', nullable: true })
  @IsOptional()
  @IsString()
  copyStatus?: string;

  @Column({ name: 'client_id' })
  @IsNumber()
  @IsOptional()
  clientId?: number;

  @Column({ type: 'timestamptz', name: 'start_date', nullable: true })
  @IsOptional()
  @IsString()
  startDate?: string;

  @Column({ type: 'timestamptz', name: 'end_date', nullable: true })
  @IsOptional()
  @IsString()
  endDate?: string;



  @ManyToOne(() => Version, (Version) => Version.versionId)
  @JoinColumn({ name: 'root_version_id' })
  @Column({ name: 'root_version_id' })
  @IsNumber()
  @IsOptional()
  rootVersionId: number;

  @ManyToOne(() => User, (User) => User.userId)
  @JoinColumn({ name: 'user_id' })
  @Column({ name: 'user_id' })
  @IsNumber()
  @IsOptional()
  userId: number;


}

export const jsonSchemas = validationMetadatasToSchemas();
