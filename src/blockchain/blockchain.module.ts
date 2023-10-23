import { Module } from '@nestjs/common';
import { BlockchainController } from './blockchain.controller';
import { BlockchainService } from './blockchain.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlockChain } from './blockchain.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BlockChain])],
  controllers: [BlockchainController],
  providers: [BlockchainService],
})
export class BlockchainModule {}
