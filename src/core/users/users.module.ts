import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { UsersController } from './users.controller';
import { Wallet } from './entities/wallet.entity';
import { Transaction } from '../blockchain/entities/transaction.entity';
import { NewTransaction } from '../blockchain/entities/new-transaction.entity';
import { SignedTransaction } from '../blockchain/entities/signed-transactions.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Wallet,
      Transaction,
      NewTransaction,
      SignedTransaction,
    ]),
  ],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
