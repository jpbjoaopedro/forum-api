import {
  Inject,
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Prisma } from '@prisma/client';

@Controller('auth')
export class AuthController {
  @Inject()
  private readonly authService: AuthService;

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  signin(@Body() body: Prisma.UserCreateInput) {
    return this.authService.signIn(body);
  }
}
