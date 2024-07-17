import { IsNumber, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateStatsDto {
  @ApiProperty({ example: 7 })
  @IsOptional()
  @IsNumber()
  points?: number;

  @ApiProperty({ example: -3 })
  @IsOptional()
  @IsNumber()
  coins?: number;

  @ApiProperty({ example: 4 })
  @IsOptional()
  @IsNumber()
  exps?: number;

  @ApiProperty({ example: false })
  @IsOptional()
  @IsBoolean()
  free_spin?: boolean;
}
