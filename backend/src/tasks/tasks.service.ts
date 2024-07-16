import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PlayersService } from 'src/players/players.service';

@Injectable()
export class TasksService {
  constructor(private readonly playersService: PlayersService) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleCron() {
    this.playersService.findMany({ page: 1, limit: 0 }).then((players) => {
      players.forEach((player) => {
        if (!player.stats.free_spin) {
          player.stats.free_spin = true;
          this.playersService.update(player.id, { stats: player.stats });
        }
      });
    });
  }
}
