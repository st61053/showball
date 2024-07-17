import { Module } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { TokensController } from './tokens.controller';
import { TokensPersistenceModule } from './persistance/persistance.module';

@Module({
  imports: [TokensPersistenceModule],
  controllers: [TokensController],
  providers: [TokensService],
  exports: [TokensService, TokensPersistenceModule],
})
export class TokensModule {}
