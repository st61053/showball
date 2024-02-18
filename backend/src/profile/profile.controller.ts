import { Controller, Get, Post, Request } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ApiTags, ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { Player } from 'src/players/domain/player';

@ApiBearerAuth()
@ApiTags('Profile')
@Controller({ path: 'profile', version: '1' })
export class ProfileController {
    constructor(private profileServices: ProfileService) { }

    @ApiOkResponse({ description: 'Gets profile of logged player.', type: Player })
    @Get('/')
    async getPlayerProfile(@Request() req) {
        return this.profileServices.getProfileById(req.user.playerId);
    }

    @Post('/show-token')
    async showToken(@Request() req) {
        //
    }

    @Post('/meet-challenge')
    async meetChallenge(@Request() req) {
        //
    }

    @Post('/upgrade-token')
    async upgradeToken(@Request() req) {
        //
    }
}
