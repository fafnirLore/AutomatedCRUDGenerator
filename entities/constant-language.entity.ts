import { IsOptional, IsNumber, IsString } from 'class-validator';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { Language } from 'src/language/entities/language.entity';
import { LabelConstant } from 'src/label-constants/entities/label-constant.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('constant_language')
export class ConstantLanguage {
  @PrimaryGeneratedColumn({ name: 'constant_language_id' })
  @IsOptional()
  @IsNumber()
  constantLanguageId?: number;

  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  value?: string;

  @Column({ name: 'dml_status', nullable: true })
  @IsOptional()
  @IsNumber()
  dmlStatus?: number;

  @ManyToOne(() => LabelConstant, (LabelConstant) => LabelConstant.labelConstantId)
  @JoinColumn({ name: 'constant_id' })
  @Column({ name: 'constant_id' })
  @IsNumber()
  @IsOptional()
  constantId: number;

  @ManyToOne(() => Language, (Language) => Language.languageId)
  @JoinColumn({ name: 'language_id' })
  @Column({ name: 'language_id' })
  @IsNumber()
  @IsOptional()
  languageId: number;
}

export const jsonSchemas = validationMetadatasToSchemas();
