import { ApiProperty } from '@nestjs/swagger';

export class PlayerStatsDTO {
  @ApiProperty({ example: 0 })
  points: number;

  @ApiProperty({ example: 0 })
  coins: number;

  @ApiProperty({ example: 0 })
  exp: number;
}
