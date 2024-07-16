import { Injectable } from '@nestjs/common';
import { PlayersService } from 'src/players/players.service';
import { LeaderBoard, LeaderBoardRow } from './domain/leader-board';

@Injectable()
export class LeaderBoardService {
  constructor(private playersService: PlayersService) {}

  async getLeaderBoard(
    target: 'coins' | 'points' | 'exps',
  ): Promise<LeaderBoard> {
    const players = await this.playersService.findMany({
      limit: 0,
      page: 1,
    });

    players.sort((a, b) => b.stats[target] - a.stats[target]);

    const leaderBoardRows: LeaderBoardRow[] = players.map((player) => ({
      player: player.username,
      score: player.stats[target],
    }));

    return { rows: leaderBoardRows };
  }
}
