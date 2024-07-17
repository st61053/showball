import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { PlayersModule } from 'src/players/players.module';
import { TokensModule } from 'src/tokens/tokens.module';
import { ChallengesModule } from 'src/challenges/challenges.module';

@Module({
  imports: [PlayersModule, TokensModule, ChallengesModule],
  providers: [ProfileService],
  controllers: [ProfileController],
})
export class ProfileModule {}
