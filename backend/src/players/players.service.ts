import { hash } from 'bcrypt';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreatePlayerDTO } from './dto/create-player.dto';
import { PlayerRepository } from './persistence/repositories/player.repository';
import { Player } from './domain/player';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { RoleEnum } from 'src/shared/enum/role-type.enum';

@Injectable()
export class PlayersService {
  constructor(private readonly playersRepository: PlayerRepository) { }

  async create(body: CreatePlayerDTO): Promise<Player> {

    const clonedPayload = {
      roles: [RoleEnum.user],
      stats: {
        points: 0,
        coins: 0,
        exps: 0
      },
      tokens: [],
      challenges: [],
      ...body
    };

    clonedPayload.password = await hash(clonedPayload.password, 12);

    const playerUsernameObject = await this.playersRepository.findOne({ username: clonedPayload.username });
    if (playerUsernameObject) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            username: 'usernameAlreadyExists',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const playerEmailObject = await this.playersRepository.findOne({ email: clonedPayload.email });
    if (playerEmailObject) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            email: 'emailAlreadyExists',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return this.playersRepository.create(clonedPayload);
  }

  async findMany(paginationOptions: IPaginationOptions): Promise<Player[]> {
    return this.playersRepository.findMany(paginationOptions);
  }

  async findOne(fields: EntityCondition<Player>): Promise<Player | null> {
    return this.playersRepository.findOne(fields);
  }

  async update(id: string, body: Partial<Player>): Promise<Player> {
    const clonedPayload = { ...body };

    if (clonedPayload.username) {
      const playerUsernameObject = await this.playersRepository.findOne({ username: clonedPayload.username });
      if (playerUsernameObject) {
        throw new HttpException(
          {
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            errors: {
              username: 'usernameAlreadyExists',
            },
          },
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
    }

    const updatedPlayer = await this.playersRepository.update(id, clonedPayload);

    if (!updatedPlayer) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          errors: {
            player: 'notFound',
          },
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return updatedPlayer;
  }
}
