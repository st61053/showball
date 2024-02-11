import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Player, PlayerModel } from '../database/player.model';
import { CreatePlayerDTO } from './dto/create-player.dto';
import { UpdatePlayerDTO } from './dto/update-player.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

@Injectable()
export class PlayersService {
  constructor(@InjectModel(Player.name) private playerModel: PlayerModel) {}

  async create(body: CreatePlayerDTO): Promise<Player> {
    const createdPlayer = new this.playerModel(body);
    const player = await createdPlayer.save();
    return player;
  }

  async findByUsername(username: string): Promise<Player> {
    const player = await this.playerModel
      .findOne({ username: username })
      .exec();

    if (!player) {
      throw new NotFoundException(
        `Player with username: ${username} not found!`,
      );
    }

    return player;
  }

  async findById(playerId: string): Promise<Player> {
    const player = await this.playerModel.findById(playerId).exec();

    if (!player) {
      throw new NotFoundException(
        `Player with identifier: ${playerId} not found!`,
      );
    }

    return player;
  }

  async findAll(paginationQuery: PaginationQueryDto): Promise<Player[]> {
    const { limit, offset } = paginationQuery;

    const players = await this.playerModel
      .find()
      .skip(offset)
      .limit(limit)
      .exec();

    return players;
  }

  async update(username: string, body: UpdatePlayerDTO): Promise<Player> {
    await this.playerModel
      .findOneAndUpdate({ username: username }, body)
      .exec();
    const updatedPlayer = await this.playerModel
      .findOne({ username: username })
      .exec();
    return updatedPlayer;
  }
}
