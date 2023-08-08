import { IsOptional, IsNumber, IsString } from 'class-validator';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('language')
export class Language {
  @PrimaryGeneratedColumn({ name: 'language_id' })
  @IsOptional()
  @IsNumber()
  languageId?: number;

  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  title?: string;

  @Column({ name: 'dml_status', nullable: true })
  @IsOptional()
  @IsNumber()
  dmlStatus?: number;

  @Column({ name: 'code', nullable: true })
  @IsOptional()
  @IsNumber()
  code?: number;

  @Column({ name: 'client_id', nullable: true })
  @IsOptional()
  @IsNumber()
  clientId?: number;
}
export const jsonSchemas = validationMetadatasToSchemas();
