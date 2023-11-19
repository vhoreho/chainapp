import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/users.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async getProfile(username: string) {
    return this.usersRepository.findOne({
      where: { username },
      select: ['id', 'username', 'role', 'email'],
    });
  }
}
