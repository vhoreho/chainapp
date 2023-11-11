import { Module } from '@nestjs/common';
import { BlockchainController } from './blockchain.controller';
import { BlockchainService } from './blockchain.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlockChain } from './blockchain.entity';
import { UsersModule } from '../users/users.module';
import { User } from '../users/users.entity';
import { JwtStrategy } from '../auth/strategy/jwt.strategy';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([BlockChain, User])],
  controllers: [BlockchainController],
  providers: [BlockchainService, JwtStrategy],
})
export class BlockchainModule {}
