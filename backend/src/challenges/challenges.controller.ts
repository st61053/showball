import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Challenges')
@Controller({ path: 'challenges', version: '1' })
export class ChallengesController {
  constructor(private readonly challengesService: ChallengesService) { }

  @Post()
  create(@Body() createChallengeDto: CreateChallengeDto) {
    return this.challengesService.create(createChallengeDto);
  }

  @Get()
  findAll() {
    return this.challengesService.findAll();
  }

  @Get(':textId')
  findOne(@Param('textId') textId: string) {
    return this.challengesService.findOne(textId);
  }

  @Patch(':textId')
  update(@Param('textId') textId: string, @Body() updateChallengeDto: UpdateChallengeDto) {
    return this.challengesService.update(textId, updateChallengeDto);
  }

  @Delete(':textId')
  remove(@Param('textId') textId: string) {
    return this.challengesService.remove(textId);
  }
}
