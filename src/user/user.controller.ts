import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Prisma, User as UserModel } from '@prisma/client';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getUser(@Param('id') id: string): Promise<UserModel | null> {
    return await this.userService.user({ id: Number(id) });
  }

  @UseGuards(AuthGuard)
  @Get()
  async getUsers(): Promise<UserModel[] | null> {
    return await this.userService.users()
  }
 
  @Post()
  async signupUser(
    @Body() userData: Prisma.UserCreateInput,
  ): Promise<UserModel> {
    return await this.userService.createUser(userData);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async updateUser(
    @Body() userData: Prisma.UserUpdateInput,
    @Param('id') id: string,
  ): Promise<UserModel> {
    return await this.userService.updateUser({
      where: { id: Number(id) },
      data: userData,
    });
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async DeleteUser(@Param('id') id: string): Promise<UserModel> {
    return await this.userService.deleteUser({ id: Number(id) });
  }
}
