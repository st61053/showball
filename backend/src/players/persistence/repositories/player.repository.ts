import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PlayerSchemaClass } from '../schemas/player.schema';
import { PlayerMapper } from '../mappers/player.mapper';
import { Player } from '../../domain/player';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { EntityCondition } from 'src/utils/types/entity-condition.type';

@Injectable()
export class PlayerRepository {
  constructor(
    @InjectModel(PlayerSchemaClass.name)
    private readonly playersModel: Model<PlayerSchemaClass>,
  ) {}

  async create(player: Omit<Player, 'id'>): Promise<Player> {
    const playerDoc = PlayerMapper.toPersistence(player);
    const createdPlayer = new this.playersModel(playerDoc);
    const playerObject = await createdPlayer.save();
    return PlayerMapper.toDomain(playerObject);
  }

  async findMany(paginationOptions: IPaginationOptions): Promise<Player[]> {
    const players = await this.playersModel
      .find()
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return players.map(PlayerMapper.toDomain);
  }

  async findOne(fields: EntityCondition<Player>): Promise<Player | null> {
    if (fields.id) {
      const player = await this.playersModel.findById(fields.id);
      return player ? PlayerMapper.toDomain(player) : null;
    }

    const player = await this.playersModel.findOne(fields);
    return player ? PlayerMapper.toDomain(player) : null;
  }

  async update(id: string, payload: Partial<Player>): Promise<Player | null> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id };
    const userObject = await this.playersModel.findOneAndUpdate(
      filter,
      clonedPayload,
      { new: true },
    );

    return userObject ? PlayerMapper.toDomain(userObject) : null;
  }
}
