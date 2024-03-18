import { IsInt, IsString } from 'class-validator';

export class CreateBlockDto {
  @IsInt()
  amount: number;

  @IsString()
  coin: string;

  @IsString()
  message: string;

  @IsString()
  wallet: string;
}
