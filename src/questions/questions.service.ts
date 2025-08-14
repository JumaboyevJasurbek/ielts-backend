// src/services/question.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateQuestionDto } from './dto/create-question.dto';
import { Question } from './entity/question.entity';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
  ) {}

  async create(createQuestionDto: CreateQuestionDto): Promise<Question> {
    const question = this.questionRepository.create(createQuestionDto);
    return await this.questionRepository.save(question);
  }

  async findAll(): Promise<Question[]> {
    return await this.questionRepository.find();
  }

  async findOne(id: number): Promise<Question> {
    const question = await this.questionRepository.findOne({ where: { id } });
    if (!question) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }
    return question;
  }

  async update(
    id: number,
    updateQuestionDto: UpdateQuestionDto,
  ): Promise<Question> {
    console.log('Updating question with ID:', updateQuestionDto);
    await this.questionRepository.update(id, updateQuestionDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const question = await this.findOne(id);
    await this.questionRepository.remove(question);
  }

  async getTestQuestions(): Promise<Omit<Question, 'correctAnswer'>[]> {
    const questions = await this.questionRepository.find();
    return questions.map(({ correctAnswer, ...question }) => question);
  }

  async calculateScore(
    answers: number[],
  ): Promise<{ score: number; percentage: number; total: number }> {
    const questions = await this.questionRepository.find();
    let correctCount = 0;

    questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correctCount++;
      }
    });

    const percentage = Math.round((correctCount / questions.length) * 100);

    return {
      score: correctCount,
      percentage,
      total: questions.length,
    };
  }
}
