import { Inject, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  @Inject()
  private readonly prisma: PrismaService;

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async users(): Promise<User[] | null> {
    return await this.prisma.user.findMany()
  }

  async createUser(data: Prisma.UserCreateInput) {
    const saltOrRounds = 10;
    const password = data.password;
    const hashPassword = await bcrypt.hash(password, saltOrRounds);

    return await this.prisma.user.create({
      data: { ...data, password: hashPassword },
    });
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;

    let updateData = {...data}
    let hashPassword: string;
    if (data.password) {
      const saltOrRounds = 10;
      const password = data.password as string;
      hashPassword = await bcrypt.hash(password, saltOrRounds);
      updateData = {...data, password: hashPassword}
    }

    return await this.prisma.user.update({
      data: updateData,
      where,
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return await this.prisma.user.delete({
      where,
    });
  }
}
