import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/users.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async getProfile(username: string) {
    const user = await this.usersRepository.findOne({
      where: { username },
      relations: ['wallet'],
      select: ['id', 'username', 'role', 'email', 'publicKey', 'wallet'],
    });

    return user;
  }
}
