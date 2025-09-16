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
        return this.prisma.user.findUnique({
            where: userWhereUniqueInput,
        });
    }

    async createUser(data: Prisma.UserCreateInput) {
        const saltOrRounds = 10;
        const password = data.password;
        const hashPassword = await bcrypt.hash(password, saltOrRounds);

        return this.prisma.user.create({ data: { ...data, password: hashPassword } })
    }

    async updateUser(params: {
        where: Prisma.UserWhereUniqueInput;
        data: Prisma.UserUpdateInput;
    }): Promise<User> {
        const { where, data } = params;

        const saltOrRounds = 10;
        const password = data.password as string;
        const hashPassword = await bcrypt.hash(password, saltOrRounds);

        return this.prisma.user.update({
            data: { ...data, password: hashPassword },
            where,
        });
    }

    async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
        return this.prisma.user.delete({
            where,
        });
    }
}
