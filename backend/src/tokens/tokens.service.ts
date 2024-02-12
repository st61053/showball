import { Injectable } from '@nestjs/common';
import { CreateTokenDto } from './dto/create-token.dto';
import { UpdateTokenDto } from './dto/update-token.dto';

@Injectable()
export class TokensService {
  create(createTokenDto: CreateTokenDto) {
    return 'This action adds a new token';
  }

  findAll() {
    return `This action returns all tokens`;
  }

  findOne(textId: string) {
    return `This action returns a #${textId} token`;
  }

  update(textId: string, updateTokenDto: UpdateTokenDto) {
    return `This action updates a #${textId} token`;
  }

  remove(textId: string) {
    return `This action removes a #${textId} token`;
  }
}
