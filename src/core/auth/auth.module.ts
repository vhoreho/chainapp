import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/core/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JWT_CONSTANTS } from './constants';
import { JwtStrategy } from './strategy/jwt.strategy';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategy/local.strategy';
import { BlockchainModule } from '../blockchain/blockchain.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from '../blockchain/entities/transaction.entity';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: JWT_CONSTANTS.SECRET,
    }),
    BlockchainModule,
    TypeOrmModule.forFeature([Transaction]),
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy],
  exports: [AuthService, JwtModule, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
