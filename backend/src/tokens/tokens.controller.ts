import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, NotFoundException } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { CreateTokenDto } from './dto/create-token.dto';
import { UpdateTokenDto } from './dto/update-token.dto';
import { ApiTags, ApiBearerAuth, ApiParam, ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { Token } from './domain/token';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Public } from 'src/auth/decorator/public.decorator';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { RoleEnum } from 'src/shared/enum/role-type.enum';
import { RolesGuard } from 'src/auth/guard/roles.guard';

@ApiTags('Tokens')
@Controller({ path: 'tokens', version: '1' })
export class TokensController {
  constructor(private readonly tokensService: TokensService) { }

  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'Create token.', type: Token })
  @Roles(RoleEnum.admin)
  @UseGuards(RolesGuard)
  @Post()
  async create(@Body() createTokenDto: CreateTokenDto) {
    return this.tokensService.create(createTokenDto);
  }

  @Public()
  @ApiOkResponse({
    description: 'Gets collection of tokens.',
    type: Token,
    isArray: true,
  })
  @Get()
  async findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.tokensService.findAll(paginationQuery);
  }

  @Public()
  @ApiParam({ name: 'textId', type: String, required: true })
  @ApiOkResponse({ description: 'Token', type: Token })
  @Get(':textId')
  async findOne(@Param('textId') textId: string) {
    const token = await this.tokensService.findOne({ textId });

    if (!token) {
      throw new NotFoundException(`Token with textId ${textId} not found.`);
    }

    return token;
  }

  @ApiBearerAuth()
  @Roles(RoleEnum.admin)
  @UseGuards(RolesGuard)
  @ApiParam({ name: 'textId', type: String, required: true })
  @Patch(':textId')
  async update(@Param('textId') textId: string, @Body() updateTokenDto: UpdateTokenDto) {
    return this.tokensService.update(textId, updateTokenDto);
  }

  @ApiBearerAuth()
  @Roles(RoleEnum.admin)
  @UseGuards(RolesGuard)
  @ApiParam({ name: 'textId', type: String, required: true })
  @Delete(':textId')
  async remove(@Param('textId') textId: string) {
    return this.tokensService.delete(textId);
  }
}
