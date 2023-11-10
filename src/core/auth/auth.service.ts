import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/core/users/users.entity';
import { UsersService } from 'src/core/users/users.service';
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
      throw new BadRequestException('authorization.user-not-found');
    }

    const validatePass = await bcrypt.compare(userData.password, user.password);

    if (user && !validatePass) {
      throw new BadRequestException('authorization.wrong-password');
    }

    const authData = {
      id: user.id,
      username: user.username,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(authData),
      authData,
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

    const authData = { username: user.username, role: user.role, id: user.id };
    const access_token = this.jwtService.sign(authData);

    return {
      access_token: access_token,
      authData,
    };
  }

  async validateUser(username: string, password: string): Promise<User> {
    const foundUser = await this.usersService.findUser(username);

    if (!foundUser) {
      throw new BadRequestException('authorization.user-not-found');
    }

    const validatePass = await bcrypt.compare(password, foundUser.password);

    if (foundUser && !validatePass) {
      throw new BadRequestException('authorization.wrong-password');
    }

    if (foundUser && validatePass) {
      return foundUser;
    }

    return null;
  }
}
