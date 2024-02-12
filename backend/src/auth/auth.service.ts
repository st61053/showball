import { compare } from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PlayersService } from '../players/players.service';
import { AccessToken } from './interface/access-token.interface';
import { UserPrincipal } from './interface/user-principal.interface';
import { JwtPayload } from './interface/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private playersService: PlayersService,
    private jwtService: JwtService,
  ) { }

  async validateUser(username: string, password: string): Promise<UserPrincipal | null> {
    const player = await this.playersService.findByUsername(username);
    const match = await compare(password, player.password);

    if (match) {
      const user: UserPrincipal = {
        playerId: player._id.toString(),
        username: player.username,
        email: player.email,
        roles: player.roles,
      };

      return user;
    }

    return null;
  }

  async login(user: UserPrincipal): Promise<AccessToken> {

    const payload: JwtPayload = {
      sub: user.playerId,
      upn: user.username,
      email: user.email,
      roles: user.roles,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
