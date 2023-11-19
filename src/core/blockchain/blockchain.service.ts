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

@Injectable()
export class BlockchainService {
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
              JSON.stringify(newBlock.data) +
              newBlock.nonce,
          ).toString()
        : MD5(
            newBlock.created_date +
              JSON.stringify(newBlock.data) +
              newBlock.nonce,
          ).toString();
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
}
