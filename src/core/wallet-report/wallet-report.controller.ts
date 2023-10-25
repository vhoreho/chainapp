import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { WalletReportService } from './wallet-report.service';
import { CreateWalletReportDto } from './dto/wallet-report.dto';

@Controller('wallet-report')
export class WalletReportController {
  constructor(private readonly walletReportService: WalletReportService) {}

  @Post()
  createReport(
    @Body(ValidationPipe) createWalletReportDto: CreateWalletReportDto,
  ) {
    return this.walletReportService.createReport(createWalletReportDto);
  }

  @Get()
  getAllReports() {
    return this.walletReportService.getAllReports();
  }

  @Get('/crimes')
  getListOfCrimesType() {
    return this.walletReportService.getAvailableCrimeTypes();
  }
}
