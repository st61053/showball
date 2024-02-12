import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { PlayersModule } from 'src/players/players.module';

@Module({
  imports: [PlayersModule],
  providers: [ProfileService],
  controllers: [ProfileController]
})
export class ProfileModule { }
