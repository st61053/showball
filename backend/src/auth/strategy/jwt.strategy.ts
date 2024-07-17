import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../interface/jwt-payload.interface';
import { UserPrincipal } from '../interface/user-principal.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('jwt.secret', { infer: true }),
        });
    }

    async validate(payload: JwtPayload): Promise<UserPrincipal> {
        return { playerId: payload.sub, username: payload.upn, email: payload.email, roles: payload.roles };
    }
}