import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateTokenDto } from './dto/create-token.dto';
import { Token } from './domain/token';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { TokenRepository } from './persistance/repositories/token.repository';
import { EntityCondition } from 'src/utils/types/entity-condition.type';

@Injectable()
export class TokensService {
  constructor(private readonly tokensRepository: TokenRepository) { }

  async create(body: CreateTokenDto): Promise<Token> {
    const clonedPayload = {
      state: true,
      ...body
    };

    const tokenTextIdObject = await this.tokensRepository.findOne({ textId: clonedPayload.textId });
    if (tokenTextIdObject) {
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

    return this.tokensRepository.create(clonedPayload);
  }

  async findAll(paginationOptions: IPaginationOptions): Promise<Token[]> {
    return this.tokensRepository.findMany(paginationOptions);
  }

  async findOne(fields: EntityCondition<Token>): Promise<Token | null> {
    return this.tokensRepository.findOne(fields);
  }

  async update(textId: string, body: Partial<Token>): Promise<Token> {
    const clonedPayload = { ...body };

    const updatedToken = await this.tokensRepository.update(textId, clonedPayload);

    if (!updatedToken) {
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

    return updatedToken;
  }

  async delete(textId: string): Promise<boolean> {
    return this.tokensRepository.delete(textId);
  }
}
