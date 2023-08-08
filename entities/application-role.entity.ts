import { IsNumber, IsOptional, IsString } from 'class-validator';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { Applications } from 'src/applications/entities/applications.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('application_roles')
export class ApplicationRole {
  @IsNumber()
  @IsOptional()
  @PrimaryGeneratedColumn({ name: 'application_role_id' })
  applicationRoleId?: number;

  @IsString()
  @IsOptional()
  @Column({ name: 'name' })
  name?: string;

  @IsString()
  @IsOptional()
  @Column({ name: 'type' })
  type?: string;

  @IsNumber()
  @IsOptional()
  @Column({ name: 'menu_flag' })
  menuFlag?: number;

  @IsString()
  @IsOptional()
  @Column({ name: 'title' })
  title?: string;

  @IsNumber()
  @IsOptional()
  @Column({ name: 'menu_parent' })
  menuParent?: number;

  @IsOptional()
  @IsNumber()
  @Column({ name: 'dml_status' })
  dmlStatus?: number;

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
  @Column({ name: 'category' })
  category?: string;

  @IsString()
  @IsOptional()
  @Column({ name: 'url' })
  url?: string;

  @IsNumber()
  @IsOptional()
  @Column({ name: 'page_flag' })
  pageFlag?: number;

  @IsNumber()
  @IsOptional()
  @Column({ name: 'event_flag' })
  eventFlag?: number;

  @IsString()
  @IsOptional()
  @Column({ name: 'sub_category' })
  subCategory?: string;

  @IsString()
  @IsOptional()
  @Column({ name: 'quick_link' })
  quickLink?: string;

  @IsNumber()
  @IsOptional()
  @Column({ name: 'client_id' })
  clientId?: number;

  @IsString()
  @IsOptional()
  @Column({ name: 'icon' })
  icon?: string;

  @IsString()
  @IsOptional()
  @Column({ name: 'category_icon' })
  categoryIcon?: string;

  @IsNumber()
  @IsOptional()
  @Column({ name: 'app_role_id' })
  appRoleId?: number;

  @IsString()
  @IsOptional()
  @Column({ name: 'description', length: 255 })
  description?: string;

  @ManyToOne(() => Applications, (applications) => applications.applicationsId)
  @JoinColumn({ name: 'application_id' })
  @Column({ name: 'application_id' })
  applicationsId: number;

  @ManyToOne(
    () => ApplicationRole,
    (ApplicationRole) => ApplicationRole.applicationRoleId,
  )
  @JoinColumn({ name: 'root_id' })
  @Column({ name: 'root_id' })
  @IsNumber()
  @IsOptional()
  rootId: number;

  @ManyToOne(() => User, (User) => User.userId)
  @JoinColumn({ name: 'user_id' })
  @Column({ name: 'user_id' })
  @IsNumber()
  @IsOptional()
  userId: number;

}

export const jsonSchemas = validationMetadatasToSchemas();
