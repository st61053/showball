import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { PlayersModule } from './players/players.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';
import { ProfileModule } from './profile/profile.module';
import { TokensModule } from './tokens/tokens.module';
import { ChallengesModule } from './challenges/challenges.module';
import configuration from './config/configuration';
import { MongooseConfigService } from './database/config.service';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    ThrottlerModule.forRoot([{ ttl: 60, limit: 10 }]),
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    }),

    // feature module
    AuthModule,
    ProfileModule,
    PlayersModule,
    TokensModule,
    ChallengesModule,
    FilesModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
