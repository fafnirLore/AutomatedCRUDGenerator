import { IsOptional, IsNumber, IsString } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('login_security_questions')
export class LoginSecurityQuestion {
  @PrimaryGeneratedColumn({ name: 'login_security_question_id' })
  @IsOptional()
  @IsNumber()
  loginSecurityQuestionId?: number;

  @Column({ name: 'title', nullable: false })
  @IsString()
  @IsOptional()
  title?: string;

  @Column({ name: 'description', nullable: false })
  @IsString()
  @IsOptional()
  description?: string;

  @Column({ name: 'dml_status', nullable: false })
  @IsOptional()
  @IsNumber()
  dmlStatus?: number;
}
