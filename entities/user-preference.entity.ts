import { IsOptional, IsNumber, IsString } from 'class-validator';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { BusinessRole } from 'src/business-roles/entities/business-role.entity';
import { Language } from 'src/language/entities/language.entity';
// import { Project } from 'src/project/entities/project.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user_preferences')
export class UserPreference {
  @PrimaryGeneratedColumn({ name: 'user_preference_id' })
  @IsOptional()
  @IsNumber()
  userPreferenceId?: number;

  @Column({ name: 'default_skin', nullable: true })
  @IsOptional()
  @IsString()
  defaultSkin?: string;

  @IsNumber()
  @IsOptional()
  @Column({ name: 'idle_timeout', nullable: true })
  idleTimeout?: number;

  @IsNumber()
  @IsOptional()
  @Column({ name: 'notification_interval', nullable: true })
  notificationInterval?: number;

  @IsNumber()
  @IsOptional()
  @Column({ name: 'chat_interval', nullable: true })
  chatInterval?: number;

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

  @Column({ name: 'version', nullable: true })
  @IsOptional()
  @IsString()
  version?: string;

  @Column({ name: 'landing_page', nullable: true })
  @IsOptional()
  @IsString()
  landingPage?: string;

  @ManyToOne(() => Language, (Language) => Language.languageId)
  @JoinColumn({ name: 'default_language' })
  @Column({ name: 'default_language' })
  @IsNumber()
  @IsOptional()
  defaultLanguage: number;


  @ManyToOne(() => BusinessRole, (BusinessRole) => BusinessRole.businessRoleId)
  @JoinColumn({ name: 'default_project_role' })
  @Column({ name: 'default_project_role' })
  @IsNumber()
  @IsOptional()
  defaultProjectRole: number;

  @ManyToOne(
    () => UserPreference,
    (UserPreference) => UserPreference.userPreferenceId,
  )
  @JoinColumn({ name: 'root_preference_id' })
  @Column({ name: 'root_preference_id' })
  @IsNumber()
  @IsOptional()
  rootPreferenceId: number;

  @ManyToOne(() => User, (User) => User.userId)
  @JoinColumn({ name: 'user_id' })
  @Column({ name: 'user_id' })
  @IsNumber()
  @IsOptional()
  userId: number;
}
export const jsonSchemas = validationMetadatasToSchemas();
