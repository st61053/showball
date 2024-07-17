import { IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpgradeTokensDto {
  @ApiProperty({ example: false })
  @IsOptional()
  @IsBoolean()
  free: boolean;
}
