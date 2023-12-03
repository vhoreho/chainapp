import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/core/users/users.entity';
import { UsersService } from 'src/core/users/users.service';
import * as bcrypt from 'bcrypt';
import { AUTHORIZATION_ERRORS } from 'src/constants/errors';
import { SignUpDto } from './dto/sign-up-dto';
import { LogInDto } from './dto/login-dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(logInDto: LogInDto) {
    const { username, password } = logInDto;
    const user = await this.usersService.findUser(username);

    if (!user) {
      throw new BadRequestException(AUTHORIZATION_ERRORS.LOGIN.USER_NOT_FOUND);
    }

    const validatePass = await bcrypt.compare(password, user.password);

    if (user && !validatePass) {
      throw new BadRequestException(AUTHORIZATION_ERRORS.LOGIN.WRONG_PASSWORD);
    }

    const authData = {
      id: user.id,
      username: user.username,
      role: user.role,
      email: user.email,
      publicKey: user.publicKey,
    };

    const access_token = this.jwtService.sign(authData);

    return { access_token };
  }

  async register(createUserDto: SignUpDto) {
    const { username, password, email } = createUserDto;
    const existingUser = await this.usersService.findUser(username);
    if (existingUser) {
      throw new BadRequestException(
        AUTHORIZATION_ERRORS.SIGN_UP.USER_ALREADY_TAKEN,
      );
    }

    const existingEmail = await this.usersService.findByEmail(email);
    if (existingEmail) {
      throw new BadRequestException(
        AUTHORIZATION_ERRORS.SIGN_UP.EMAIL_ALREADY_TAKEN,
      );
    }

    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);

    const user = await this.usersService.registerUser(
      username,
      hashedPassword,
      email,
    );

    if (!user) {
      throw new BadRequestException(
        AUTHORIZATION_ERRORS.SIGN_UP.FAILED_REGISTER,
      );
    }

    const authData = {
      username: user.username,
      role: user.role,
      id: user.id,
      email: user.email,
      publicKey: user.publicKey,
    };

    const access_token = this.jwtService.sign(authData);

    return { access_token };
  }

  async validateUser(username: string, password: string): Promise<User> {
    const foundUser = await this.usersService.findUser(username);

    if (!foundUser) {
      throw new BadRequestException(AUTHORIZATION_ERRORS.LOGIN.USER_NOT_FOUND);
    }

    const validatePass = await bcrypt.compare(password, foundUser.password);

    if (foundUser && !validatePass) {
      throw new BadRequestException(AUTHORIZATION_ERRORS.LOGIN.WRONG_PASSWORD);
    }

    if (foundUser && validatePass) {
      return foundUser;
    }

    return null;
  }
}
