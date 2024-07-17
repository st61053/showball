import { ApiProperty } from '@nestjs/swagger';

export class LeaderBoardRow {
  @ApiProperty({ example: 'player-username' })
  player: string;
  @ApiProperty({ example: 125 })
  score: number;
}

export class LeaderBoard {
  @ApiProperty({ example: [{ player: 'player-username', score: 125 }] })
  rows: LeaderBoardRow[];
}
