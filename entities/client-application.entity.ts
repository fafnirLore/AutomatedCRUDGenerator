import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
// import { Client } from 'src/client/entities/client.entity';
import { Applications } from 'src/applications/entities/applications.entity';
import { User } from 'src/users/entities/user.entity';

@Entity('client_applications')
export class ClientApplication {
  @IsNumber()
  @IsOptional()
  @PrimaryGeneratedColumn({ name: 'client_application_id' })
  clientApplicationId?: number;

  @IsOptional()
  @IsString()
  @Column({ name: 'insertion_timestamp', type: 'timestamptz' })
  insertionTimestamps?: string;

  @IsOptional()
  @IsString()
  @Column({ name: 'close_timestamp', type: 'timestamptz' })
  closeTimestamps?: string;

  @IsOptional()
  @IsNumber()
  @Column({ name: 'dml_status' })
  dmlStatus?: number;



  @ManyToOne(() => Applications, (app) => app.applicationsId)
  @JoinColumn({ name: 'application_id' })
  @Column({ name: 'application_id' })
  @IsNumber()
  @IsOptional()
  applicationsId: number;

  @ManyToOne(
    () => ClientApplication,
    (ClientApplication) => ClientApplication.clientApplicationId,
  )
  @JoinColumn({ name: 'root_id' })
  @Column({ name: 'root_id' })
  @IsNumber()
  @IsOptional()
  rootId: number;

  @ManyToOne(() => User, (u) => u.userId)
  @JoinColumn({ name: 'user_id' })
  @Column({ name: 'user_id' })
  @IsNumber()
  @IsOptional()
  userId: number;
}

export const jsonSchemas = validationMetadatasToSchemas();
