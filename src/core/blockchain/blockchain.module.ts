import { Module } from '@nestjs/common';
import { BlockchainController } from './blockchain.controller';
import { BlockchainService } from './blockchain.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { UsersModule } from '../users/users.module';
import { User } from '../users/entities/users.entity';
import { JwtStrategy } from '../auth/strategy/jwt.strategy';
import { NewTransaction } from './entities/new-transaction.entity';
import { SignedTransaction } from './entities/signed-transactions.entity';
import { Wallet } from '../users/entities/wallet.entity';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([
      Transaction,
      NewTransaction,
      User,
      SignedTransaction,
      Wallet,
    ]),
  ],
  controllers: [BlockchainController],
  providers: [BlockchainService, JwtStrategy],
})
export class BlockchainModule {}
