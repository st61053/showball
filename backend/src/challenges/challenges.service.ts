import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';
import { Challenge } from './domain/challenge';
import { ChallengeRepository } from './persistance/repositories/challenge.repository';

@Injectable()
export class ChallengesService {
  constructor(private challengesRepository: ChallengeRepository) { }

  async create(body: CreateChallengeDto): Promise<Challenge> {
    const clonedPayload = {
      state: true,
      ...body
    };

    const challengeTextIdObject = await this.challengesRepository.findOne({ textId: clonedPayload.textId });

    if (challengeTextIdObject) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            textId: 'textIdAlreadyExists',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return this.challengesRepository.create(clonedPayload);
  }

  async findAll() {
    return `This action returns all challenges`;
  }

  async findOne(textId: string) {
    return `This action returns a #${textId} challenge`;
  }

  async update(textId: string, body: UpdateChallengeDto) {
    return `This action updates a #${textId} challenge`;
  }

  async remove(textId: string) {
    return `This action removes a #${textId} challenge`;
  }
}
