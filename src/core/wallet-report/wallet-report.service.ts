// wallet-report.service.ts
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { WalletReport } from './wallet-report.entity';
import { User } from 'src/core/users/entities/users.entity';
import { CreateWalletReportDto } from './dto/wallet-report.dto';
import WalletCrimes from './enum/wallet-crimes';

@Injectable()
export class WalletReportService {
  constructor(
    @InjectRepository(WalletReport)
    private readonly walletReportRepository: Repository<WalletReport>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async createReport({
    userId,
    crimeDescription,
    crimeType,
    wasInvolvedInIllegalActivity,
    walletAddress,
  }: CreateWalletReportDto): Promise<WalletReport> {
    const report = new WalletReport();

    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });

    report.user = user;
    report.wasInvolvedInIllegalActivity = wasInvolvedInIllegalActivity;
    report.crimeDescription = crimeDescription;
    report.crimeType = crimeType;
    report.walletAddress = walletAddress;

    return this.walletReportRepository.save(report);
  }

  async getAllReports(): Promise<WalletReport[]> {
    return this.walletReportRepository.find({ relations: ['user'] });
  }

  getAvailableCrimeTypes(): string[] {
    return Object.values(WalletCrimes);
  }
}
