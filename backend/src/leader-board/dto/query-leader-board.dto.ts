import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

export class QueryLeaderBoardDTO {
  @ApiProperty({ example: 'points' })
  @IsEnum(['points', 'coins', 'exps'])
  target: 'points' | 'coins' | 'exps';
}
