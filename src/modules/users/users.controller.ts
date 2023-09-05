import { Controller, Get, Put, Param, Body } from '@nestjs/common';
import { UserWithoutPassword } from '@common/types';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('api/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers(): Promise<UserWithoutPassword[]> {
    return this.usersService.findAll();
  }

  @Put(':id')
  updateUser(
    @Param('id') userId: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserWithoutPassword> {
    return this.usersService.updateUser(userId, updateUserDto);
  }
}
