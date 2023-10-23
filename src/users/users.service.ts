import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { Roles } from './enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  findUser(username: string): Promise<User> {
    return this.usersRepository.findOneBy({ username });
  }

  async findAllUsers(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  registerUser(
    username: string,
    password: string,
    email: string,
  ): Promise<User> {
    return this.usersRepository.save({
      username,
      password,
      email,
      role: Roles.User,
    });
  }
}
