import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [QuestionsController],
  imports: [DatabaseModule],
  providers: [QuestionsService],
})
export class QuestionsModule {}
