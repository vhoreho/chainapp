import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { UserRole } from 'src/enums/user-role.enum';
import { ec } from 'elliptic';
import { AUTHORIZATION_ERRORS, USERS_ERRORS } from 'src/constants/errors';
import * as bitcoin from 'bitcoinjs-lib';

@Injectable()
export class UsersService {
  private elliptic = new ec('secp256k1');
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  findUser(username: string): Promise<User> {
    return this.usersRepository.findOneBy({ username });
  }

  findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ where: { email } });
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

  async generateAndReturnKeys(
    username: string,
  ): Promise<{ privateKey: string; publicKey: string }> {
    const user = await this.usersRepository.findOne({ where: { username } });

    if (!user) {
      throw new NotFoundException(USERS_ERRORS.USER_NOT_FOUND);
    }

    const keyPair = await this.generateKeyPair();

    user.publicKey = keyPair.publicKey;
    user.walletAddress = this.generateWalletAddress(keyPair.publicKey);
    this.usersRepository.save(user);

    return { privateKey: keyPair.privateKey, publicKey: keyPair.publicKey };
  }

  async generateKeyPair(): Promise<{ publicKey: string; privateKey: string }> {
    const keyPair = this.elliptic.genKeyPair();
    const publicKey = keyPair.getPublic('hex');
    const privateKey = keyPair.getPrivate('hex');
    return { publicKey, privateKey };
  }

  async validatePrivateKey(
    username: string,
    privateKey: string,
  ): Promise<boolean> {
    const user = await this.usersRepository.findOne({ where: { username } });

    if (!user) {
      throw new NotFoundException(AUTHORIZATION_ERRORS.LOGIN.USER_NOT_FOUND);
    }

    if (!user.publicKey) {
      throw new BadRequestException(USERS_ERRORS.USER_HAS_NOT_PUBLIC_KEY);
    }

    try {
      const keyPair = this.elliptic.keyFromPrivate(privateKey, 'hex');
      const publicKey = keyPair.getPublic('hex');

      return publicKey === user.publicKey;
    } catch (error) {
      return false;
    }
  }

  async getPublicKeyFromPrivateKey(privateKey: string): Promise<string> {
    const keyPair = this.elliptic.keyFromPrivate(privateKey, 'hex');
    return keyPair.getPublic('hex');
  }

  private generateWalletAddress(publicKey: string): string {
    return bitcoin.payments
      .p2pkh({ pubkey: Buffer.from(publicKey, 'hex') })
      .address?.toString();
  }
}
