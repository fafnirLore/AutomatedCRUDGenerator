import { IsOptional, IsNumber, IsString } from 'class-validator';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user_log')
export class UserLog {
  @PrimaryGeneratedColumn({ name: 'user_log_id' })
  @IsOptional()
  @IsNumber()
  userLogId?: number;

  @Column({ type: 'timestamptz', name: 'user_log_datetime', nullable: true })
  @IsOptional()
  @IsString()
  userLogDatetime?: string;

  @Column({ type: 'timestamptz', name: 'user_logout_datetime', nullable: true })
  @IsOptional()
  @IsString()
  userLogoutDatetime?: string;

  @Column({
    type: 'timestamptz',
    name: 'last_checked_datetime',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  lastCheckedDatetime?: string;

  @Column({ name: 'dml_status', nullable: true })
  @IsOptional()
  @IsNumber()
  dmlStatus?: number;

  @Column({ name: 'dml_user_id', nullable: true })
  @IsOptional()
  @IsNumber()
  dmlUserId?: number;



  @Column({ type: 'timestamptz', name: 'token_expiry', nullable: true })
  @IsOptional()
  @IsString()
  tokenExpiry?: string;

  @ManyToOne(() => User, (User) => User.userId)
  @JoinColumn({ name: 'user_id' })
  @Column({ name: 'user_id', type: "integer" })
  @IsNumber()
  @IsOptional()
  userId: number;
}

export const jsonSchemas = validationMetadatasToSchemas();
