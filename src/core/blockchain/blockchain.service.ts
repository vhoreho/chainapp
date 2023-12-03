import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BlockChain } from './blockchain.entity';
import { Repository } from 'typeorm';
import { CreateBlockDto } from './dto/blochchain.dto';
import { calculateHash } from './helpers';
import { User } from '../users/users.entity';
import { AUTHORIZATION_ERRORS } from 'src/constants/errors';
import * as moment from 'moment';
import { MD5 } from 'crypto-js';
import { ec } from 'elliptic';

@Injectable()
export class BlockchainService {
  private elliptic = new ec('secp256k1');

  constructor(
    @InjectRepository(BlockChain)
    private blockChainRepository: Repository<BlockChain>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async getBlockchain() {
    return await this.blockChainRepository.find();
  }

  async createBlock(block: CreateBlockDto): Promise<BlockChain> {
    const user = await this.usersRepository.findOne({
      where: { id: block.userId },
      select: ['username', 'id'],
    });

    if (!user) {
      throw new BadRequestException(AUTHORIZATION_ERRORS.LOGIN.USER_NOT_FOUND);
    }

    const lastChainRecord = await this.blockChainRepository
      .createQueryBuilder('block_chain')
      .select()
      .orderBy('block_chain.id', 'DESC')
      .getOne();

    try {
      const newBlock = new BlockChain();
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
        : '7252f2453b7a9cd4703e362cbe7dae48';

      return await this.blockChainRepository.save(newBlock);
    } catch (error) {
      throw new Error(error);
    }
  }

  async clearBlockchain() {
    try {
      await this.blockChainRepository.clear();
      return true;
    } catch (error) {
      return false;
    }
  }

  async mineBlock(id: number, difficulty: number) {
    const block = await this.blockChainRepository.findOne({ where: { id } });

    let nonce = 0;

    while (
      calculateHash(block.data + nonce.toString()).substring(0, difficulty) !==
      Array(difficulty + 1).join('0')
    ) {
      nonce++;
    }

    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 5000);
    });

    const newBlock = { ...block, nonce };

    return await this.blockChainRepository.save(newBlock);
  }

  async signTransaction(privateKey: string, transaction: any): Promise<string> {
    const keyPair = this.elliptic.keyFromPrivate(privateKey, 'hex'); // Использование приватного ключа для подписи
    const transactionHash = this.hashTransaction(transaction);
    const signature = keyPair.sign(transactionHash, 'base64');
    return signature.toDER('hex');
  }

  async verifyTransactionSignature(
    publicKey: string,
    signature: string,
    transaction: any,
  ): Promise<boolean> {
    const key = this.elliptic.keyFromPublic(publicKey, 'hex'); // Использование публичного ключа для верификации
    const transactionHash = this.hashTransaction(transaction);
    return key.verify(transactionHash, signature);
  }

  hashTransaction(transaction: any): string {
    return MD5(
      transaction.sender + transaction.recipient + transaction.amount,
    ).toString();
  }
}
