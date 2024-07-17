import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TokenSchemaClass } from '../schemas/token.schema';
import { TokenMapper } from '../mappers/token.mapper';
import { Token } from 'src/tokens/domain/token';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { EntityCondition } from 'src/utils/types/entity-condition.type';

@Injectable()
export class TokenRepository {
  constructor(
    @InjectModel(TokenSchemaClass.name)
    private readonly tokensModel: Model<TokenSchemaClass>,
  ) {}

  async create(token: Omit<Token, 'id'>): Promise<Token> {
    const tokenDoc = TokenMapper.toPersistence(token);
    const createdToken = new this.tokensModel(tokenDoc);
    const tokenObject = await createdToken.save();
    return TokenMapper.toDomain(tokenObject);
  }

  async findMany(paginationOptions: IPaginationOptions): Promise<Token[]> {
    const tokens = await this.tokensModel
      .find()
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return tokens.map(TokenMapper.toDomain);
  }

  async findOne(fields: EntityCondition<Token>): Promise<Token | null> {
    const token = await this.tokensModel.findOne(fields);
    return token ? TokenMapper.toDomain(token) : null;
  }

  async update(textId: string, payload: Partial<Token>): Promise<Token | null> {
    const clonedPayload = { ...payload };

    const filter = { textId: textId };
    const tokenObject = await this.tokensModel.findOneAndUpdate(
      filter,
      clonedPayload,
      { new: true },
    );

    return tokenObject ? TokenMapper.toDomain(tokenObject) : null;
  }

  async delete(textId: string): Promise<boolean> {
    const filter = { textId: textId };
    const result = await this.tokensModel.deleteOne(filter);
    return result.deletedCount > 0;
  }
}
