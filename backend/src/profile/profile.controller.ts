import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Request,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOkResponse,
  ApiParam,
} from '@nestjs/swagger';
import { Player } from 'src/players/domain/player';
import { UpdateStatsDto } from './dto/update-stats.dto';
import { UpgradeTokensDto } from './dto/upgrade-token.dto';

@ApiBearerAuth()
@ApiTags('Profile')
@Controller({ path: 'profile', version: '1' })
export class ProfileController {
  constructor(private profileServices: ProfileService) {}

  @ApiOkResponse({
    description: 'Gets profile of logged player.',
    type: Player,
  })
  @Get('/')
  async getPlayerProfile(@Request() req) {
    return this.profileServices.getProfileById(req.user.playerId);
  }

  @ApiParam({
    name: 'textId',
    type: String,
    description: 'Token text identifier.',
    required: true,
  })
  @Post('/show-token/:textId')
  async showToken(@Request() req, @Param('textId') textId: string) {
    return this.profileServices.showToken(req.user.playerId, textId);
  }

  @ApiParam({
    name: 'textId',
    type: String,
    description: 'Challenge text identifier.',
    required: true,
  })
  @Post('/meet-challenge/:textId')
  async meetChallenge(@Request() req, @Param('textId') textId: string) {
    return this.profileServices.meetChallenge(req.user.playerId, textId);
  }

  @ApiParam({
    name: 'textId',
    type: String,
    description: 'Token text identifier.',
    required: true,
  })
  @Post('/upgrade-token/:textId')
  async upgradeToken(
    @Request() req,
    @Param('textId') textId: string,
    @Body() body: UpgradeTokensDto,
  ) {
    return this.profileServices.upgradeToken(
      req.user.playerId,
      textId,
      body.free,
    );
  }

  @Patch('/stats')
  async updateStats(@Request() req, @Body() body: UpdateStatsDto) {
    return this.profileServices.updateStats(req.user.playerId, body);
  }

  @Post('/spin-wheel')
  async spinWheel(@Request() req) {
    return this.profileServices.spinWheel(req.user.playerId);
  }
}
