// wallet-report.dto.ts
import { IsBoolean, IsEnum, IsInt, IsString } from 'class-validator';
import WalletCrimes from '../enum/wallet-crimes';

export class CreateWalletReportDto {
  @IsInt()
  userId: number;

  @IsBoolean()
  wasInvolvedInIllegalActivity: boolean;

  @IsEnum(WalletCrimes)
  crimeType: WalletCrimes;

  @IsString()
  crimeDescription: string;

  @IsString()
  walletAddress: string;
}
