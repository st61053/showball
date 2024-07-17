import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  Patch,
  Query,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  ClassSerializerInterceptor,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
  ApiCreatedResponse,
  ApiParam,
} from '@nestjs/swagger';
import { PlayersService } from './players.service';
import { CreatePlayerDTO } from './dto/create-player.dto';
import { UpdatePlayerDTO } from './dto/update-player.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { Public } from '../auth/decorator/public.decorator';
import { Player } from './domain/player';

@ApiTags('Players')
@UseInterceptors(ClassSerializerInterceptor)
@Controller({ path: 'players', version: '1' })
export class PlayersController {
  constructor(private playersService: PlayersService) {}

  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Gets collection of players.',
    type: Player,
    isArray: true,
  })
  @Get()
  async getPlayers(@Query() paginationQuery: PaginationQueryDto) {
    return this.playersService.findMany(paginationQuery);
  }

  @ApiBearerAuth()
  @ApiParam({ name: 'playerId', type: String, required: true })
  @ApiOkResponse({ description: 'Player', type: Player })
  @Get('/:playerId')
  async getPlayerById(@Param('playerId') playerId: string) {
    const player = this.playersService.findOne({ id: playerId });

    if (!player) {
      throw new NotFoundException(`Player with id ${playerId} not found`);
    }

    return player;
  }

  @Public()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ description: 'Create player.', type: Player })
  async createPlayer(@Body() body: CreatePlayerDTO) {
    return this.playersService.create(body);
  }

  @ApiBearerAuth()
  @ApiParam({ name: 'playerId', type: String, required: true })
  @Patch('/:playerId')
  async updatePlayer(
    @Param('playerId') playerId: string,
    @Body() body: UpdatePlayerDTO,
  ) {
    return this.playersService.update(playerId, body);
  }
}
