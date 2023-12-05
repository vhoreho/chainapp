import { Module } from '@nestjs/common';
import { BlockchainController } from './blockchain.controller';
import { BlockchainService } from './blockchain.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './transaction.entity';
import { UsersModule } from '../users/users.module';
import { User } from '../users/users.entity';
import { JwtStrategy } from '../auth/strategy/jwt.strategy';
import { NewTransaction } from './new-transaction.entity';
import { SignedTransaction } from './signed-transactions.entity';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([
      Transaction,
      NewTransaction,
      User,
      SignedTransaction,
    ]),
  ],
  controllers: [BlockchainController],
  providers: [BlockchainService, JwtStrategy],
})
export class BlockchainModule {}
