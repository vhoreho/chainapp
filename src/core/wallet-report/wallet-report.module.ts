import { Module } from '@nestjs/common';
import { WalletReportController } from './wallet-report.controller';
import { WalletReportService } from './wallet-report.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletReport } from './wallet-report.entity';
import { User } from 'src/core/users/entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WalletReport, User])],
  controllers: [WalletReportController],
  providers: [WalletReportService],
})
export class WalletReportModule {}
