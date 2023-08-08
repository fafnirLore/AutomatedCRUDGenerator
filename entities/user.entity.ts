import {
  IsOptional,
  IsNumber,
  IsString,
  IsBoolean,
  IsNotEmpty,
} from 'class-validator';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { BusinessRole } from 'src/business-roles/entities/business-role.entity';
import { Department } from 'src/department/entities/department.entity';
import { UserLog } from 'src/user-log/entities/user-log.entity';
import { UserTypeLov } from 'src/user-type-lov/entities/user-type-lov.entity';
import { LoginSecurityQuestion } from 'src/login-security-questions/entities/login-security-question.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  @IsOptional()
  @IsNumber()
  userId?: number;

  @Column({ type: 'varchar', name: 'username', nullable: false, unique: true })
  @IsString()
  username?: string;

  @Column({ name: 'first_name', nullable: false })
  @IsString()
  @IsOptional()
  firstName?: string;

  @Column({ name: 'last_name', nullable: false })
  @IsString()
  @IsOptional()
  lastName?: string;

  @Column({ type: 'varchar', name: 'password', nullable: false, select: false })
  @IsString()
  @IsOptional()
  @BeforeInsert()
  password: string;

  @Column({ name: 'email' })
  @IsString()
  @IsNotEmpty({ message: 'The email is required' })
  email?: string;

  @Column({ name: 'gender', nullable: false })
  @IsString()
  @IsOptional()
  gender?: string;

  @Column({ name: 'profile_image', nullable: true })
  @IsString()
  @IsOptional()
  profileImage?: string;

  @Column({ type: 'timestamptz', name: 'insertion_timestamp', nullable: false })
  @IsOptional()
  @IsString()
  insertionTimestamp?: string;

  @Column({
    type: 'timestamptz',
    nullable: false,
    name: 'close_timestamp',
  })
  @IsOptional()
  @IsString()
  closeTimeStamp?: string;

  @Column({ name: 'contact', nullable: false, unique: true })
  @IsString()
  @IsOptional()
  contact?: string;

  @Column({ name: 'status', nullable: false })
  @IsString()
  @IsOptional()
  status?: string;

  @Column({ name: 'date_of_birth', nullable: false })
  @IsOptional()
  @IsString()
  dateOfBirth?: string;

  @Column({ nullable: false })
  @IsString()
  @IsOptional()
  address?: string;

  @Column({ name: 'dml_status', nullable: false })
  @IsOptional()
  @IsNumber()
  dmlStatus?: number;

  @Column({ name: 'employee_id', default: 0, nullable: false })
  @IsNumber()
  @IsOptional()
  employeeId?: number;

  @Column({ name: 'marital_status', nullable: false })
  @IsString()
  @IsOptional()
  maritalStatus?: string;

  @Column({ name: 'reset_password_hash' })
  @IsString()
  @IsOptional()
  resetPasswordHash?: string;

  @Column({
    type: 'timestamptz',
    name: 'hash_expiry',
    nullable: true,
    select: false,
  })
  @IsOptional()
  @IsString()
  hashExpiry?: string;

  @Column({ name: 'verification_code', select: false })
  @IsString()
  @IsOptional()
  verificationCode?: string;

  @Column({ name: 'is_verified', select: false })
  @IsString()
  @IsOptional()
  isVerified?: string;

  @Column({ name: 'security_question_answer' })
  @IsString()
  @IsOptional()
  securityQuestionAnswer?: string;

  @Column({ name: 'stay_sign_in', default: 'false' })
  @IsBoolean()
  @IsOptional()
  staySignIn?: boolean;

  @Column({
    type: 'timestamptz',
    name: 'password_reset_date',
    nullable: true,
    select: false,
  })
  @IsOptional()
  @IsString()
  passwordResetDate?: string;

  @ManyToOne(() => BusinessRole, (BusinessRole) => BusinessRole.businessRoleId)
  @JoinColumn({ name: 'business_role_id' })
  @Column({ name: 'business_role_id' })
  @IsNumber()
  @IsOptional()
  businessRoleId: any;

  @ManyToOne(() => Department, (Department) => Department.departmentId)
  @JoinColumn({ name: 'department_id' })
  @Column({ name: 'department_id' })
  @IsOptional()
  departmentId: any;

  @ManyToOne(() => User, (User) => User.userId)
  @JoinColumn({ name: 'root_id' })
  @Column({ name: 'root_id' })
  @IsNumber()
  @IsOptional()
  rootId: number;

  @ManyToOne(() => UserLog, (UserLog) => UserLog.userLogId)
  @JoinColumn({ name: 'user_log_id' })
  @Column({ name: 'user_log_id' })
  @IsNumber()
  @IsOptional()
  userLogId: any;

  @ManyToOne(() => UserTypeLov, (UserTypeLov) => UserTypeLov.userTypeLovId)
  @JoinColumn({ name: 'user_type_lov_id' })
  @Column({ name: 'user_type_lov_id' })
  @IsNumber()
  @IsOptional()
  userTypeLovId: any;

  @ManyToOne(
    () => LoginSecurityQuestion,
    (LoginSecurityQuestion) => LoginSecurityQuestion.loginSecurityQuestionId,
  )
  @JoinColumn({ name: 'login_security_question_id' })
  @Column({ name: 'login_security_question_id' })
  @IsNumber()
  @IsOptional()
  loginSecurityQuestionId: any;
}

export const jsonSchemas = validationMetadatasToSchemas();
