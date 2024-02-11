import { compare } from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PlayersService } from '../players/players.service';
import { AccessToken } from './interface/access-token.interface';
import { JwtPayload } from './interface/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private playersService: PlayersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, password: string): Promise<AccessToken> {
    const player = await this.playersService.findByUsername(username);
    const match = await compare(password, player.password);

    if (!match) {
      throw new UnauthorizedException();
    }

    const payload: JwtPayload = {
      sub: player._id.toString(),
      upn: player.username,
      email: player.email,
      roles: player.roles,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
