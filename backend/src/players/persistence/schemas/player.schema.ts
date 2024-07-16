import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { RoleEnum } from 'src/shared/enum/role-type.enum';
import { EntityDocumentHelper } from 'src/utils/document-entity-helper';

export type UserSchemaDocument = HydratedDocument<PlayerSchemaClass>;

@Schema({ _id: false })
export class PlayerStatsSchemaClass {
  @Prop({ required: true, default: 0, min: 0 })
  points: number;

  @Prop({ required: true, default: 0, min: 0 })
  coins: number;

  @Prop({ required: true, default: 0, min: 0 })
  exps: number;

  @Prop({ required: true, default: 0, min: 0 })
  straight: number;
}

@Schema({ _id: false })
export class TokenStatsSchemaClass {
  @Prop({ required: true })
  textId: string;

  @Prop({ required: true, default: 0, min: 0 })
  count: number;

  @Prop({ required: true, default: 1, min: 1 })
  level: number;
}

@Schema({ _id: false })
export class ChallengeStatsSchemaClass {
  @Prop({ required: true })
  textId: string;

  @Prop()
  timestamp: Date;
}

@Schema({ collection: 'players', timestamps: true })
export class PlayerSchemaClass extends EntityDocumentHelper {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, index: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({
    type: String,
    default: null,
  })
  imageSrc?: string | null;

  @Prop({
    type: PlayerStatsSchemaClass,
    required: true,
    default: new PlayerStatsSchemaClass(),
  })
  stats: PlayerStatsSchemaClass;

  @Prop({ type: [TokenStatsSchemaClass] })
  tokens: TokenStatsSchemaClass[];

  @Prop({ type: [ChallengeStatsSchemaClass] })
  challenges: ChallengeStatsSchemaClass[];

  @Prop({ type: [String] })
  titles: string[];

  @Prop({ type: [String], required: true, default: [RoleEnum.user] })
  roles: RoleEnum[];
}

export const PlayerSchema = SchemaFactory.createForClass(PlayerSchemaClass);
