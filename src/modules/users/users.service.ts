import { UpdateUserDto } from './dto/update-user.dto';
import { exclude } from '@common/utils';
import { PrismaService } from '@modules/prisma/prisma.service';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UserWithoutPassword } from '@common/types';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<UserWithoutPassword[]> {
    const users = await this.prismaService.user.findMany();

    return users.map((user) => exclude(user, ['password']));
  }

  async updateUser(
    userId: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserWithoutPassword> {
    try {
      const user = await this.prismaService.user.update({
        where: { id: userId },
        data: updateUserDto,
      });

      return exclude(user, ['password']);
    } catch (error) {
      // TODO: config error code enum later
      // refs: https://www.prisma.io/docs/reference/api-reference/error-reference#p2025
      if (error.code === 'P2025') {
        throw new NotFoundException();
      }

      throw new InternalServerErrorException();
    }
  }
}
