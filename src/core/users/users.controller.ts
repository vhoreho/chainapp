import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { USER_ROLE } from 'src/enums/user-role.enum';

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

    if (requestingUser.role !== USER_ROLE.SUPERADMIN) {
      throw new UnauthorizedException(
        'У вас нет прав для удаления пользователя',
      );
    }

    return await this.usersService.deleteUser(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('generate-keys')
  async generateKeys(@Req() request) {
    const { username } = request.user;

    return this.usersService.generateAndReturnKeys(username);
  }

  @UseGuards(JwtAuthGuard)
  @Get('validate-key')
  async validatePrivateKey(
    @Req() request,
    @Body() body: { privateKey: string },
  ) {
    const { username } = request.user;
    const { privateKey } = body;

    return this.usersService.validatePrivateKey(username, privateKey);
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-keys')
  async getPublicKeyFromPrivate(@Body() body) {
    const { privateKey } = body;

    return this.usersService.getPublicKeyFromPrivateKey(privateKey);
  }

  @UseGuards(JwtAuthGuard)
  @Post('change-role')
  async changeRole(@Req() request, @Body() { role }) {
    const { username } = request.user;

    return this.usersService.changeRole(username, role);
  }
}
