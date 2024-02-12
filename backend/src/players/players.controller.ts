import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PlayersService } from './players.service';
import { CreatePlayerDTO } from './dto/create-player.dto';
import { PlayerDTO } from './dto/player.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { RolesGuard } from '../auth/guard/roles.guard';
import { Roles } from '../auth/decorator/roles.decorator';
import { Public } from '../auth/decorator/public.decorator';
import { RoleType } from '../shared/enum/role-type.enum';

@ApiTags('Players')
@Controller({ path: 'players', version: '1' })
export class PlayersController {
  constructor(private playersService: PlayersService) { }

  @Public()
  @Post('/')
  async createPlayer(@Body() body: CreatePlayerDTO) {
    const player = await this.playersService.create(body);

    return PlayerDTO.from(player);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'List of players',
    type: PlayerDTO,
    isArray: true,
  })
  @UseGuards(RolesGuard)
  @Roles(RoleType.Admin)
  @Get('/')
  async getPlayers(@Query() paginationQuery: PaginationQueryDto) {
    const players = await this.playersService.findAll(paginationQuery);

    return players.map(PlayerDTO.from);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Player', type: PlayerDTO })
  @UseGuards(RolesGuard)
  @Roles(RoleType.Admin)
  @Get('/:playerId')
  async getPlayerById(@Param('playerId') playerId: string) {
    const player = await this.playersService.findById(playerId);

    return PlayerDTO.from(player);
  }
}
