import { IsOptional, IsNumber } from 'class-validator';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { ApplicationRole } from 'src/application-roles/entities/application-role.entity';
import { LabelConstant } from 'src/label-constants/entities/label-constant.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('form_label_constant')
export class FormLabelConstant {
  @PrimaryGeneratedColumn({ name: 'form_label_constant_id' })
  @IsOptional()
  @IsNumber()
  formLabelConstantId?: number;

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

  @ManyToOne(
    () => ApplicationRole,
    (ApplicationRole) => ApplicationRole.applicationRoleId,
  )
  @JoinColumn({ name: 'form_id' })
  @Column({ name: 'form_id' })
  @IsNumber()
  @IsOptional()
  formId: number;
}
export const jsonSchemas = validationMetadatasToSchemas();
