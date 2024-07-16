import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LeaderBoard } from './domain/leader-board';
import { RoleEnum } from 'src/shared/enum/role-type.enum';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { QueryLeaderBoardDTO } from './dto/query-leader-board.dto';
import { LeaderBoardService } from './leader-board.service';

@ApiTags('Leader Board')
@UseInterceptors(ClassSerializerInterceptor)
@Controller({ path: 'leader-board', version: '1' })
export class LeaderBoardController {
  constructor(private leaderBoardService: LeaderBoardService) {}

  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Gets leader board of players.',
    type: LeaderBoard,
  })
  @Roles(RoleEnum.admin)
  @UseGuards(RolesGuard)
  @Get('')
  async getLeaderBoard(@Query() leaderBoardQuery: QueryLeaderBoardDTO) {
    return this.leaderBoardService.getLeaderBoard(leaderBoardQuery.target);
  }
}
