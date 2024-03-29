import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { Repository } from 'typeorm';
import { USER_ROLE } from 'src/enums/user-role.enum';
import { ec } from 'elliptic';
import * as bcrypt from 'bcrypt';
import { AUTHORIZATION_ERRORS, USERS_ERRORS } from 'src/constants/errors';
import * as bitcoin from 'bitcoinjs-lib';
import { Wallet } from './entities/wallet.entity';

@Injectable()
export class UsersService {
  private elliptic = new ec('secp256k1');
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Wallet) private walletRepository: Repository<Wallet>,
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

  async registerUser(
    username: string,
    password: string,
    role: USER_ROLE = USER_ROLE.SIMPLE_USER,
  ): Promise<User> {
    return await this.usersRepository.save({
      username,
      password,
      role,
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
  ): Promise<{ wallet: string; privateKey: string; publicKey: string }> {
    const user = await this.usersRepository.findOne({ where: { username } });

    if (!user) {
      throw new NotFoundException(USERS_ERRORS.USER_NOT_FOUND);
    }

    const wallet = new Wallet();
    const keyPair = await this.generateKeyPair();

    wallet.address = this.generateWalletAddress(keyPair.publicKey);
    wallet.user = user;
    this.walletRepository.save(wallet);

    user.publicKey = keyPair.publicKey;
    user.role = USER_ROLE.BLOCK_CREATOR;
    this.usersRepository.save(user);

    return {
      wallet: wallet.address,
      privateKey: keyPair.privateKey,
      publicKey: keyPair.publicKey,
    };
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

  async changeRole(username: string, role: USER_ROLE) {
    try {
      const user = await this.usersRepository.findOne({ where: { username } });

      if (!user) {
        throw new NotFoundException(USERS_ERRORS.USER_NOT_FOUND);
      }

      await this.usersRepository.save({
        ...user,
        publicKey: null,
        walletAddress: null,
        role,
      });

      return true;
    } catch (error) {
      throw new BadRequestException('Something went wrong');
    }
  }

  async createUser(username: string, password: string, role: USER_ROLE) {
    const existingUser = await this.usersRepository.findOne({
      where: { username },
    });

    if (existingUser) {
      throw new BadRequestException(
        AUTHORIZATION_ERRORS.SIGN_UP.USER_ALREADY_TAKEN,
      );
    }

    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);

    const user = await this.registerUser(username, hashedPassword, role);

    if (!user) {
      throw new BadRequestException(
        AUTHORIZATION_ERRORS.SIGN_UP.FAILED_REGISTER,
      );
    }

    return;
  }

  async getWallets(username: string) {
    const wallets = await this.walletRepository
      .createQueryBuilder('wallet')
      .innerJoinAndSelect('wallet.user', 'user')
      .where('user.username != :username', { username })
      .getMany();

    return wallets;
  }
}
