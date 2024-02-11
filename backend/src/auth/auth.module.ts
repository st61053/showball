import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PlayersModule } from 'src/players/players.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    PlayersModule,
    JwtModule.register({
      global: true,
      secret: process.env.APP_SECRET || 'secret-key',
      signOptions: { expiresIn: '1800s' },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
