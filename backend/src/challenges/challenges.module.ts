import { Module } from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { ChallengesController } from './challenges.controller';
import { ChallengesPersistenceModule } from './persistance/persistance.module';

@Module({
  imports: [ChallengesPersistenceModule],
  controllers: [ChallengesController],
  providers: [ChallengesService],
  exports: [ChallengesService, ChallengesPersistenceModule],
})
export class ChallengesModule { }
