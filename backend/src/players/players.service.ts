import { hash } from 'bcrypt';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreatePlayerDTO } from './dto/create-player.dto';
import { PlayerRepository } from './persistence/repositories/player.repository';
import { Player } from './domain/player';
import { LeaderBoard, LeaderBoardRow } from './domain/leader-board';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { RoleEnum } from 'src/shared/enum/role-type.enum';

@Injectable()
export class PlayersService {
  constructor(private readonly playersRepository: PlayerRepository) {}

  async create(body: CreatePlayerDTO): Promise<Player> {
    const clonedPayload = {
      roles: [RoleEnum.user],
      stats: {
        points: 0,
        coins: 0,
        exps: 0,
        straight: 0,
      },
      tokens: [],
      challenges: [],
      ...body,
    };

    clonedPayload.password = await hash(clonedPayload.password, 12);

    const playerUsernameObject = await this.playersRepository.findOne({
      username: clonedPayload.username,
    });
    if (playerUsernameObject) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          errors: {
            username: 'usernameAlreadyExists',
          },
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const playerEmailObject = await this.playersRepository.findOne({
      email: clonedPayload.email,
    });
    if (playerEmailObject) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          errors: {
            email: 'emailAlreadyExists',
          },
        },
        HttpStatus.BAD_REQUEST,
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
      const playerUsernameObject = await this.playersRepository.findOne({
        username: clonedPayload.username,
      });
      if (playerUsernameObject) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            errors: {
              username: 'usernameAlreadyExists',
            },
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    const updatedPlayer = await this.playersRepository.update(
      id,
      clonedPayload,
    );

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

  async getLeaderBoard(
    target: 'coins' | 'points' | 'exps',
  ): Promise<LeaderBoard> {
    const players = await this.playersRepository.findMany({
      limit: 0,
      page: 1,
    });

    players.sort((a, b) => b.stats[target] - a.stats[target]);

    const leaderBoardRows: LeaderBoardRow[] = players.map((player) => ({
      player: player.username,
      score: player.stats[target],
    }));

    return { rows: leaderBoardRows };
  }
}
