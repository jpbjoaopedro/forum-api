import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(20)
  body: string;
}
