import { Module } from '@nestjs/common';
import { PlayersModule } from 'src/players/players.module';
import { LeaderBoardController } from './leader-board.controller';
import { LeaderBoardService } from './leader-board.service';

@Module({
  imports: [PlayersModule],
  controllers: [LeaderBoardController],
  providers: [LeaderBoardService],
  exports: [LeaderBoardService],
})
export class LeaderBoardModule {}
