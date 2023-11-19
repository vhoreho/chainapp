import { IsInt, IsString } from 'class-validator';

export class CreateBlockDto {
  @IsInt()
  userId: number;

  @IsString()
  data: string;
}
