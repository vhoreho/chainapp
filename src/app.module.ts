import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './core/auth/auth.module';
import { UsersModule } from './core/users/users.module';
import { User } from './core/users/entities/users.entity';
import { AppController } from './app.controller';
import { BlockchainModule } from './core/blockchain/blockchain.module';
import { Transaction } from './core/blockchain/entities/transaction.entity';
import { WalletReportModule } from './core/wallet-report/wallet-report.module';
import { ProfileModule } from './core/profile/profile.module';
import { NewTransaction } from './core/blockchain/entities/new-transaction.entity';
import { SignedTransaction } from './core/blockchain/entities/signed-transactions.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MaterialsModule } from './core/materials/materials.module';
import { Wallet } from './core/users/entities/wallet.entity';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => ({
        type: 'postgres',
        host: 'ep-still-term-a4l66eob-pooler.us-east-1.aws.neon.tech',
        port: 5432,
        username: 'default',
        password: 'PL4VU0yMSNsb',
        database: 'verceldb',
        entities: [
          User,
          Wallet,
          Transaction,
          NewTransaction,
          SignedTransaction,
        ],
        autoLoadEntities: true,
        synchronize: true,
        ssl: true,
      }),
    }),
    BlockchainModule,
    WalletReportModule,
    ProfileModule,
    MaterialsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
