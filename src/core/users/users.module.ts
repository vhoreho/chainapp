import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { UsersController } from './users.controller';
import { Wallet } from './entities/wallet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Wallet])],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
