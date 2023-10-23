import { IsNumber, IsString } from 'class-validator';

export class CreateBlockDto {
  @IsNumber()
  id: number;

  @IsString()
  prevHash: string;

  @IsString()
  hash: string;

  @IsString()
  created_date: string;

  @IsNumber()
  nonce: number;

  @IsString()
  data: string;
}
