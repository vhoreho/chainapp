import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Repository } from 'typeorm';
import { CreateBlockDto } from './dto/blochchain.dto';
import { calculateHash } from './helpers';
import { User } from '../users/users.entity';
import {
  AUTHORIZATION_ERRORS,
  BLOCKCHAIN_ERRORS,
  USERS_ERRORS,
} from 'src/constants/errors';
import * as moment from 'moment';
import { MD5 } from 'crypto-js';
import { ec } from 'elliptic';
import { NewTransaction } from './entities/new-transaction.entity';
import { createHash } from 'crypto';
import { SignedTransaction } from './entities/signed-transactions.entity';
import { USER_ROLE } from 'src/enums/user-role.enum';
import { ZERO_BLOCK_HASH } from 'src/constants/vars';

@Injectable()
export class BlockchainService {
  private elliptic = new ec('secp256k1');

  constructor(
    @InjectRepository(NewTransaction)
    private newTransactionRepository: Repository<NewTransaction>,
    @InjectRepository(SignedTransaction)
    private signedTransactionsRepository: Repository<SignedTransaction>,
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async getBlockchain() {
    return await this.transactionRepository.find();
  }

  async getUnsignedTransactions(username: string) {
    return await this.newTransactionRepository.find({
      where: { user: { username } },
    });
  }

  async getTransactionsForMining(username: string) {
    const user = await this.usersRepository.findOne({ where: { username } });

    if (!user) {
      throw new BadRequestException(AUTHORIZATION_ERRORS.LOGIN.USER_NOT_FOUND);
    }

    if (user.role !== USER_ROLE.MINER) {
      throw new BadRequestException(USERS_ERRORS.WRONG_ROLE);
    }

    return await this.signedTransactionsRepository.find({
      relations: ['user'],
    });
  }

  async getSignedTransactions(username: string) {
    return await this.signedTransactionsRepository.find({
      where: { user: { username } },
    });
  }

  async createBlock(block: CreateBlockDto): Promise<Transaction> {
    const user = await this.usersRepository.findOne({
      where: { id: block.userId },
      select: ['username', 'id'],
    });

    if (!user) {
      throw new BadRequestException(AUTHORIZATION_ERRORS.LOGIN.USER_NOT_FOUND);
    }

    const lastChainRecord = await this.transactionRepository
      .createQueryBuilder('block_chain')
      .select()
      .orderBy('block_chain.id', 'DESC')
      .getOne();

    try {
      const newBlock = new NewTransaction();
      newBlock.user = user;
      newBlock.created_date = moment(new Date()).format();
      newBlock.data = block.data;
      newBlock.nonce = 0;
      newBlock.hash = lastChainRecord
        ? MD5(
            lastChainRecord.prevHash +
              newBlock.created_date +
              JSON.stringify(newBlock.data),
          ).toString()
        : MD5(newBlock.created_date + JSON.stringify(newBlock.data)).toString();
      newBlock.prevHash = lastChainRecord
        ? lastChainRecord.hash
        : ZERO_BLOCK_HASH;

      return await this.newTransactionRepository.save(newBlock);
    } catch (error) {
      throw new Error(error);
    }
  }

  async clearBlockchain() {
    try {
      await this.transactionRepository.clear();
      return true;
    } catch (error) {
      return false;
    }
  }

  async mineBlock(id: number, nonce: number) {
    const block = await this.signedTransactionsRepository.findOne({
      where: { id },
    });

    const lastChainRecord = await this.transactionRepository
      .createQueryBuilder('block_chain')
      .select()
      .orderBy('block_chain.id', 'DESC')
      .getOne();

    const transaction: Transaction = {
      ...block,
      nonce,
      prevHash: lastChainRecord ? lastChainRecord.hash : ZERO_BLOCK_HASH,
      hash: MD5(block.data + nonce).toString(),
    };

    try {
      await this.transactionRepository.save(transaction);

      await this.signedTransactionsRepository.delete(block);

      return true;
    } catch (error) {
      return false;
    }
  }

  async signTransaction(
    privateKey: string,
    id: number,
    username: string,
  ): Promise<any> {
    const transaction = await this.newTransactionRepository.findOne({
      where: { id },
      select: ['hash', 'hash', 'prevHash', 'data', 'user'],
    });

    const user = await this.usersRepository.findOne({
      where: { username },
    });

    if (!user) {
      throw new BadRequestException(AUTHORIZATION_ERRORS.LOGIN.USER_NOT_FOUND);
    }

    if (!transaction) {
      throw new NotFoundException(BLOCKCHAIN_ERRORS.TRANSACTION_NOT_FOUND);
    }

    try {
      if (!transaction.hash) {
        throw new BadRequestException(
          BLOCKCHAIN_ERRORS.TRANSACTION_HAS_NOT_HASH,
        );
      }

      const keyPair = this.elliptic.keyFromPrivate(privateKey, 'hex');
      const publicKey = keyPair.getPublic('hex');

      if (publicKey !== user.publicKey) {
        throw new BadRequestException(BLOCKCHAIN_ERRORS.WRONG_PRIVATE_KEY);
      }

      const signature = keyPair.sign(transaction.hash).toDER('hex');

      const isSigned = await this.verifyTransactionSignature(
        keyPair.getPublic('hex'),
        signature,
        transaction.hash,
      );

      if (isSigned) {
        const signedBlock = this.signedTransactionsRepository.create({
          user,
          created_date: moment(new Date()).format(),
          data: transaction.data,
          hash: transaction.hash,
          prevHash: transaction.prevHash,
        });

        await this.signedTransactionsRepository.save(signedBlock);

        await this.newTransactionRepository.delete(transaction);
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async verifyTransactionSignature(
    publicKey: string,
    signature: string,
    transactionHash: string,
  ): Promise<boolean> {
    const key = this.elliptic.keyFromPublic(publicKey, 'hex');
    return key.verify(transactionHash, signature);
  }

  calculateHash(data: any): string {
    const dataString = JSON.stringify(data);
    const hash = createHash('sha256').update(dataString).digest('hex');
    return hash;
  }

  async deleteUnsignedTransaction(id: number) {
    await this.newTransactionRepository.delete({ id });

    return this.newTransactionRepository.find();
  }
}
