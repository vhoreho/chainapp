import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { UserRole } from 'src/enums/user-role.enum';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getUsersList() {
    return await this.usersService.findAllUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get('delete/:id')
  async deleteUser(@Req() request, @Param('id') id: number) {
    const requestingUser = request.user;

    if (!requestingUser) {
      throw new NotFoundException('Пользователь не найден');
    }

    if (requestingUser.role !== UserRole.SuperAdmin) {
      throw new UnauthorizedException(
        'У вас нет прав для удаления пользователя',
      );
    }

    return await this.usersService.deleteUser(id);
  }
}
