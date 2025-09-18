import { Question } from 'src/questions/entities/question.entity';
import { User } from 'src/user/entities/user.entity';
import { Answers } from '@prisma/client';

export class Answer implements Answers {
  id: number;
  title: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  questionId: number;
  user: User;
  question: Question;
}
