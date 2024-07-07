import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { RoleEnum } from 'src/shared/enum/role-type.enum';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Challenge } from './domain/challenge';
import { Public } from 'src/auth/decorator/public.decorator';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

@ApiTags('Challenges')
@Controller({ path: 'challenges', version: '1' })
export class ChallengesController {
  constructor(private readonly challengesService: ChallengesService) {}

  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'Create challenge.', type: Challenge })
  @Roles(RoleEnum.admin)
  @UseGuards(RolesGuard)
  @Post()
  async create(@Body() createChallengeDto: CreateChallengeDto) {
    return this.challengesService.create(createChallengeDto);
  }

  @Public()
  @ApiOkResponse({
    description: 'Gets collection of challenges.',
    type: Challenge,
    isArray: true,
  })
  @Get()
  async findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.challengesService.findAll(paginationQuery);
  }

  @Public()
  @ApiParam({ name: 'textId', type: String, required: true })
  @ApiOkResponse({ description: 'Challenge', type: Challenge })
  @Get(':textId')
  async findOne(@Param('textId') textId: string) {
    const challenge = await this.challengesService.findOne({ textId });

    if (!challenge) {
      throw new NotFoundException(`Challenge with textId ${textId} not found.`);
    }

    return challenge;
  }

  @ApiBearerAuth()
  @Roles(RoleEnum.admin)
  @UseGuards(RolesGuard)
  @ApiParam({ name: 'textId', type: String, required: true })
  @Patch(':textId')
  async update(
    @Param('textId') textId: string,
    @Body() updateChallengeDto: UpdateChallengeDto,
  ) {
    return this.challengesService.update(textId, updateChallengeDto);
  }

  @ApiBearerAuth()
  @Roles(RoleEnum.admin)
  @UseGuards(RolesGuard)
  @ApiParam({ name: 'textId', type: String, required: true })
  @Delete(':textId')
  async remove(@Param('textId') textId: string) {
    return this.challengesService.remove(textId);
  }
}
