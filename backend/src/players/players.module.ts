import { Module } from '@nestjs/common';
import { PlayersController } from './players.controller';
import { PlayersService } from './players.service';
import { PlayersPersistenceModule } from './persistence/persistance.module';

@Module({
  imports: [PlayersPersistenceModule],
  controllers: [PlayersController],
  providers: [PlayersService],
  exports: [PlayersService, PlayersPersistenceModule],
})
export class PlayersModule { }
