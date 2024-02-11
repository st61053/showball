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
import { HasRoles } from '../auth/decorators/roles.decorator';
import { Public } from '../auth/decorators/public.decorator';
import { RoleType } from '../shared/enum/role-type.enum';

@ApiTags('Players')
@Controller({ path: 'players', version: '1' })
export class PlayersController {
  constructor(private playersService: PlayersService) { }

  @Public()
  @Post('/')
  async create(@Body() body: CreatePlayerDTO) {
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
  @HasRoles(RoleType.Admin)
  @Get('/')
  async getPlayers(@Query() paginationQuery: PaginationQueryDto) {
    const players = await this.playersService.findAll(paginationQuery);

    return players.map(PlayerDTO.from);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Player', type: PlayerDTO })
  @UseGuards(RolesGuard)
  @HasRoles(RoleType.Admin)
  @Get('/:playerId')
  async getPlayer(@Param('playerId') playerId: string) {
    const player = await this.playersService.findById(playerId);

    return PlayerDTO.from(player);
  }
}
