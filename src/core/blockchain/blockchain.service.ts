import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BlockChain } from './blockchain.entity';
import { Repository } from 'typeorm';
import { CreateBlockDto } from './dto/blochchain.dto';
import { calculateHash } from './helpers';

@Injectable()
export class BlockchainService {
  constructor(
    @InjectRepository(BlockChain)
    private blockChainRepository: Repository<BlockChain>,
  ) {}

  async getBlockchain() {
    return await this.blockChainRepository.find();
  }

  async createBlock(block: CreateBlockDto): Promise<any> {
    const newBlock = new BlockChain();
    newBlock.created_date = block.created_date;
    newBlock.data = block.data;
    newBlock.hash = block.hash;
    newBlock.prevHash = block.prevHash;
    newBlock.nonce = block.nonce;

    return await this.blockChainRepository.save(newBlock);
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
