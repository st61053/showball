import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateStatsDto {
  @ApiProperty({ example: 7 })
  @IsNumber()
  points: number = 0;

  @ApiProperty({ example: -3 })
  @IsNumber()
  coins: number = 0;

  @ApiProperty({ example: 4 })
  @IsNumber()
  exps: number = 0;
}
