import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { Challenge } from './domain/challenge';
import { ChallengeRepository } from './persistance/repositories/challenge.repository';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { Token } from 'src/tokens/domain/token';

@Injectable()
export class ChallengesService {
  constructor(private challengesRepository: ChallengeRepository) {}

  async create(body: CreateChallengeDto): Promise<Challenge> {
    const clonedPayload = {
      state: true,
      ...body,
    };

    const challengeTextIdObject = await this.challengesRepository.findOne({
      textId: clonedPayload.textId,
    });

    if (challengeTextIdObject) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          errors: {
            textId: 'textIdAlreadyExists',
          },
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.challengesRepository.create(clonedPayload);
  }

  async findAll(paginationOptions: IPaginationOptions): Promise<Challenge[]> {
    return this.challengesRepository.findMany(paginationOptions);
  }

  async findOne(fields: EntityCondition<Token>): Promise<Challenge | null> {
    return this.challengesRepository.findOne(fields);
  }

  async update(textId: string, body: Partial<Challenge>): Promise<Challenge> {
    const clonedPayload = { ...body };

    const updatedChallenge = await this.challengesRepository.update(
      textId,
      clonedPayload,
    );

    if (!updatedChallenge) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          errors: {
            token: 'notFound',
          },
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return updatedChallenge;
  }

  async remove(textId: string): Promise<boolean> {
    return this.challengesRepository.delete(textId);
  }
}
