import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChallengeSchemaClass } from '../schemas/challenge.schema';
import { ChallengeMapper } from '../mappers/challenge.mapper';
import { Challenge } from 'src/challenges/domain/challenge';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { EntityCondition } from 'src/utils/types/entity-condition.type';

@Injectable()
export class ChallengeRepository {
  constructor(
    @InjectModel(ChallengeSchemaClass.name)
    private readonly challengesModel: Model<ChallengeSchemaClass>,
  ) {}

  async create(challenge: Omit<Challenge, 'id'>): Promise<Challenge> {
    const challengeDoc = ChallengeMapper.toPersistence(challenge);
    const createdChallenge = new this.challengesModel(challengeDoc);
    const challengeObject = await createdChallenge.save();
    return ChallengeMapper.toDomain(challengeObject);
  }

  async findMany(paginationOptions: IPaginationOptions): Promise<Challenge[]> {
    const challenges = await this.challengesModel
      .find()
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return challenges.map(ChallengeMapper.toDomain);
  }

  async findOne(fields: EntityCondition<Challenge>): Promise<Challenge | null> {
    const challenge = await this.challengesModel.findOne(fields);
    return challenge ? ChallengeMapper.toDomain(challenge) : null;
  }

  async update(
    textId: string,
    payload: Partial<Challenge>,
  ): Promise<Challenge | null> {
    const clonedPayload = { ...payload };

    const filter = { textId: textId };
    const challengeObject = await this.challengesModel.findOneAndUpdate(
      filter,
      clonedPayload,
      { new: true },
    );

    return challengeObject ? ChallengeMapper.toDomain(challengeObject) : null;
  }

  async delete(textId: string): Promise<boolean> {
    const filter = { textId: textId };
    const result = await this.challengesModel.deleteOne(filter);
    return result.deletedCount > 0;
  }
}
