import { IsNumber, IsOptional, IsString } from 'class-validator';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('label_constants')
export class LabelConstant {
  @IsNumber()
  @IsOptional()
  @PrimaryGeneratedColumn({ name: 'constants_id' })
  labelConstantId?: number;

  @IsString()
  @IsOptional()
  @Column({ name: 'value' })
  value?: string;

  @IsOptional()
  @IsNumber()
  @Column({ name: 'dml_status' })
  dmlStatus?: number;

  @IsString()
  @IsOptional()
  @Column({ name: 'constant_code' })
  constantCode?: string;

  @IsNumber()
  @IsOptional()
  @Column({ name: 'application_id' })
  applicationId?: number;
}
export const jsonSchemas = validationMetadatasToSchemas();
