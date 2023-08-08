import { IsNumber, IsOptional, IsString } from 'class-validator';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { BusinessRole } from 'src/business-roles/entities/business-role.entity';
// import { Project } from 'src/project/entities/project.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user_business_roles')
export class UserBusinessRole {
  @IsNumber()
  @IsOptional()
  @PrimaryGeneratedColumn({ name: 'user_business_roles_id' })
  userBusinessRoleId?: number;

  @IsOptional()
  @IsString()
  @Column({ name: 'close_timestamps', type: 'timestamptz' })
  closeTimestamps?: string;

  @Column({ name: 'dml_status', nullable: true })
  @IsOptional()
  @IsNumber()
  dmlStatus?: number;

  @Column({ name: 'dml_user_id', nullable: true })
  @IsOptional()
  @IsNumber()
  dmlUserId?: number;



  @IsOptional()
  @IsString()
  @Column({ name: 'insertion_timestamps', type: 'timestamptz' })
  insertionTimeStamps?: string;

  @IsNumber()
  @IsOptional()
  @Column({ name: 'client_id' })
  clientId?: number;

  @IsNumber()
  @IsOptional()
  @Column({ name: 'u_id' })
  metaUser?: number;

  @IsString()
  @IsOptional()
  @Column({ name: 'type' })
  type?: string;

  @IsString()
  @IsOptional()
  @Column({ name: 'description' })
  description?: string;

  @ManyToOne(() => BusinessRole, (BusinessRole) => BusinessRole.businessRoleId)
  @JoinColumn({ name: 'business_roles_id' })
  @Column({ name: 'business_roles_id' })
  @IsNumber()
  @IsOptional()
  businessRoleId: number;

  @ManyToOne(() => User, (User) => User.userId)
  @JoinColumn({ name: 'user_id' })
  @Column({ name: 'user_id' })
  @IsNumber()
  @IsOptional()
  userId: number;

  @ManyToOne(
    () => UserBusinessRole,
    (UserBusinessRole) => UserBusinessRole.userBusinessRoleId,
  )
  @JoinColumn({ name: 'root_id' })
  @Column({ name: 'root_id' })
  @IsNumber()
  @IsOptional()
  rootId: number;

}

export const jsonSchemas = validationMetadatasToSchemas();
