import {
  IsString,
  IsArray,
  IsNumber,
  ArrayMinSize,
  ArrayMaxSize,
} from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  questionText: string;

  @IsArray()
  @ArrayMinSize(4)
  @ArrayMaxSize(4)
  options: string[];

  @IsNumber()
  correctAnswer: number;

  @IsNumber()
  correctIndex: number;
}

export class SubmitTestDto {
  @IsArray()
  answers: number[];
}
