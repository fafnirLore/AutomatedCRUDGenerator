import { IsNumber, IsOptional, IsString } from 'class-validator';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('client_side_detail')
export class ClientSideDetail {
  @PrimaryGeneratedColumn({ name: 'client_detail_id' })
  @IsNumber()
  @IsOptional()
  clientSideDetailId?: number;

  @IsNumber()
  @IsOptional()
  @Column({ name: 'user_id' })
  userId?: number;

  @IsString()
  @IsOptional()
  @Column({ name: 'browser' })
  browser?: string;

  @IsString()
  @IsOptional()
  @Column({ name: 'browser_version' })
  browserVersion?: string;

  @IsString()
  @IsOptional()
  @Column({ name: 'os' })
  os?: string;

  @IsString()
  @IsOptional()
  @Column({ name: 'os_version' })
  osVersion?: string;

  @IsOptional()
  @IsString()
  @Column({ name: 'insertion_timestamps', type: 'timestamptz' })
  insertionTimestamps?: string;

  @IsString()
  @IsOptional()
  @Column({ name: 'client_ip' })
  clientIp?: string;

  @IsString()
  @IsOptional()
  @Column({ name: 'device' })
  device?: string;
}

export const jsonSchemas = validationMetadatasToSchemas();
