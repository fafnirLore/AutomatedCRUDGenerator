import { IsOptional, IsNumber, IsString } from 'class-validator';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { ApplicationRole } from 'src/application-roles/entities/application-role.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user_quick_link')
export class UserQuickLink {
  @PrimaryGeneratedColumn({ name: 'user_quick_link_id' })
  @IsOptional()
  @IsNumber()
  userQuickLinkId?: number;

  @Column({ name: 'dml_status', nullable: true })
  @IsOptional()
  @IsNumber()
  dmlStatus?: number;

  @Column({ name: 'dml_user_id', nullable: true })
  @IsOptional()
  @IsNumber()
  dmlUserId?: number;



  @Column({ type: 'timestamptz', name: 'insertion_timestamps', nullable: true })
  @IsOptional()
  @IsString()
  insertionTimeStamp?: string;

  @Column({
    type: 'timestamptz',
    nullable: true,
    name: 'close_timestamps',
  })
  @IsOptional()
  @IsString()
  closeTimeStamp?: string;

  @Column({ name: 'root_id' })
  @IsNumber()
  @IsOptional()
  rootId?: number;

  @ManyToOne(
    () => ApplicationRole,
    (ApplicationRole) => ApplicationRole.applicationRoleId,
  )
  @JoinColumn({ name: 'application_role_id' })
  @Column({ name: 'application_role_id' })
  @IsNumber()
  @IsOptional()
  applicationRoleId: number;

  @ManyToOne(() => User, (User) => User.userId)
  @JoinColumn({ name: 'user_id' })
  @Column({ name: 'user_id' })
  @IsNumber()
  @IsOptional()
  userId: number;
}

export const jsonSchemas = validationMetadatasToSchemas();
