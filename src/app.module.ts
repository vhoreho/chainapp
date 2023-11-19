import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './core/auth/auth.module';
import { UsersModule } from './core/users/users.module';
import { User } from './core/users/users.entity';
import { AppController } from './app.controller';
import { BlockchainModule } from './core/blockchain/blockchain.module';
import { BlockChain } from './core/blockchain/blockchain.entity';
import { WalletReportModule } from './core/wallet-report/wallet-report.module';
import { ProfileModule } from './core/profile/profile.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'ec2-34-252-169-131.eu-west-1.compute.amazonaws.com',
      port: 5432,
      username: 'gceogbbjeavkuc',
      password:
        '445983d32512ee0ab5ac69ad76e488edd89d90ecdf7636623e6e661281a23a27',
      database: 'da4toggk9aph9b',
      entities: [User, BlockChain],
      autoLoadEntities: true,
      synchronize: true,
      ssl: { rejectUnauthorized: false },
    }),
    BlockchainModule,
    WalletReportModule,
    ProfileModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
