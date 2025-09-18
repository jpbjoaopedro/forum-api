import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsAlphanumeric,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MinLength(3)
  @IsNotEmpty()
  @IsString()
  name: string;

  @MinLength(6)
  @IsNotEmpty()
  @IsAlphanumeric()
  password: string;
}
