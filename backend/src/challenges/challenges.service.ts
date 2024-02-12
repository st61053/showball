import { Injectable } from '@nestjs/common';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';

@Injectable()
export class ChallengesService {
  create(body: CreateChallengeDto) {
    return 'This action adds a new challenge';
  }

  findAll() {
    return `This action returns all challenges`;
  }

  findOne(textId: string) {
    return `This action returns a #${textId} challenge`;
  }

  update(textId: string, body: UpdateChallengeDto) {
    return `This action updates a #${textId} challenge`;
  }

  remove(textId: string) {
    return `This action removes a #${textId} challenge`;
  }
}
