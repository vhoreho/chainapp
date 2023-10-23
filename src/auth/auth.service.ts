import {
  Injectable,
  BadRequestException,
  BadGatewayException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userData: User) {
    const user = await this.usersService.findUser(userData.username);

    if (!user) {
      throw new BadRequestException('Пользователь не найден');
    }

    const validatePass = await bcrypt.compare(userData.password, user.password);

    if (user && !validatePass) {
      throw new BadRequestException('Неверный пароль');
    }

    const payload = {
      id: user.id,
      username: user.username,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
      payload,
    };
  }

  async register(username: string, password: string, email: string) {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);

    const user = await this.usersService.registerUser(
      username,
      hashedPassword,
      email,
    );

    const payload = { username: user.username, role: user.role, id: user.id };
    const access_token = this.jwtService.sign(payload);

    return {
      access_token: access_token,
      payload,
    };
  }

  async validateUser(username: string, password: string): Promise<User> {
    const foundUser = await this.usersService.findUser(username);

    if (!foundUser) {
      throw new BadRequestException('Пользователь не найден');
    }

    const validatePass = await bcrypt.compare(password, foundUser.password);

    if (foundUser && !validatePass) {
      throw new BadRequestException('Неверный пароль');
    }

    if (foundUser && validatePass) {
      return foundUser;
    }

    return null;
  }
}
