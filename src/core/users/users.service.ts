import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { UserRole } from 'src/enums/user-role.enum';

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
      role: UserRole.User,
    });
  }

  async deleteUser(id: number): Promise<void> {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    await this.usersRepository.remove(user);
  }
}
