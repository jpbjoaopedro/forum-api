import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { User as UserModel } from '@prisma/client';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getUser(
    @Param('id', ParseIntPipe) id: number
  ): Promise<Omit<UserModel, 'password'> | null> {
    return await this.userService.user({ id });
  }

  @UseGuards(AuthGuard)
  @Get()
  async getUsers(): Promise<UserModel[] | null> {
    return await this.userService.users()
  }
 
  @Post()
  async signupUser(
    @Body(new ValidationPipe()) userData: CreateUserDto,
  ): Promise<UserModel> {
    return await this.userService.createUser(userData);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async updateUser(
    @Body(new ValidationPipe()) userData: UpdateUserDto,
    @Param('id', ParseIntPipe) id: number
  ): Promise<UserModel> {
    return await this.userService.updateUser({
      where: { id },
      data: userData,
    });
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async DeleteUser(@Param('id', ParseIntPipe) id: number): Promise<UserModel> {
    return await this.userService.deleteUser({ id });
  }
}
