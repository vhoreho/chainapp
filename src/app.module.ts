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
import { RolesController } from './core/roles/roles.controller';
import { RolesModule } from './core/roles/roles.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: 'ec2-34-248-228-53.eu-west-1.compute.amazonaws.com',
        port: 5432,
        username: 'agjnaxebdiudbl',
        password:
          '3422595441cb01d6cf6e0c978bf65ec8194a163b99a187e28c9b5160a9389ff0',
        database: 'd1ubp68n1ktqul',
        entities: [User, Transaction, NewTransaction, SignedTransaction],
        autoLoadEntities: true,
        synchronize: true,
        ssl: { rejectUnauthorized: false },
      }),
    }),
    BlockchainModule,
    WalletReportModule,
    ProfileModule,
    RolesModule,
  ],
  controllers: [AppController, RolesController],
  providers: [],
})
export class AppModule {}
