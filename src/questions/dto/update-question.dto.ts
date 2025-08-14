import { PartialType } from '@nestjs/mapped-types';
import { CreateQuestionDto } from './create-question.dto';
import { IsArray } from 'class-validator';

export class UpdateQuestionDto extends PartialType(CreateQuestionDto) {}

// src/dto/submit-test.dto.ts
export class SubmitTestDto {
  @IsArray()
  answers: number[];
}
