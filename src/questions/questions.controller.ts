// src/controllers/question.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto, SubmitTestDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Controller('api')
export class QuestionsController {
  constructor(private readonly questionService: QuestionsService) {}

  // Admin CRUD endpoints
  @Post('admin/questions')
  async create(@Body() createQuestionDto: CreateQuestionDto) {
    return await this.questionService.create(createQuestionDto);
  }

  @Get('admin/questions')
  async findAll() {
    return await this.questionService.findAll();
  }

  @Get('admin/questions/:id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.questionService.findOne(id);
  }

  @Patch('admin/questions/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    console.log(
      'Updating question with ID:',
      id,
      'and data:',
      updateQuestionDto,
    );
    return await this.questionService.update(id, updateQuestionDto);
  }

  @Delete('admin/questions/:id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.questionService.remove(id);
    return { message: 'Question deleted successfully' };
  }

  // User endpoints
  @Get('test/questions')
  async getTestQuestions() {
    return await this.questionService.getTestQuestions();
  }

  @Post('test/submit')
  async submitTest(@Body() submitTestDto: SubmitTestDto) {
    return await this.questionService.calculateScore(submitTestDto.answers);
  }
}
