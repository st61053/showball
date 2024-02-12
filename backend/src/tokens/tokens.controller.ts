import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { CreateTokenDto } from './dto/create-token.dto';
import { UpdateTokenDto } from './dto/update-token.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Tokens')
@Controller({ path: 'tokens', version: '1' })
export class TokensController {
  constructor(private readonly tokensService: TokensService) { }

  @Post()
  create(@Body() createTokenDto: CreateTokenDto) {
    return this.tokensService.create(createTokenDto);
  }

  @Get()
  findAll() {
    return this.tokensService.findAll();
  }

  @Get(':textId')
  findOne(@Param('textId') textId: string) {
    return this.tokensService.findOne(textId);
  }

  @Patch(':textId')
  update(@Param('textId') textId: string, @Body() updateTokenDto: UpdateTokenDto) {
    return this.tokensService.update(textId, updateTokenDto);
  }

  @Delete(':textId')
  remove(@Param('textId') textId: string) {
    return this.tokensService.remove(textId);
  }
}
