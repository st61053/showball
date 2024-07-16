import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { PlayersModule } from 'src/players/players.module';

@Module({
  imports: [PlayersModule],
  providers: [TasksService],
})
export class TasksModule {}
