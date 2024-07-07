import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { EntityDocumentHelper } from 'src/utils/document-entity-helper';

export type TokenSchemaDocument = HydratedDocument<TokenSchemaClass>;

@Schema({ _id: false })
export class TokenLevelSchemaClass {
  @Prop({ required: true, default: 0, min: 0 })
  coins: number;

  @Prop({ required: true, default: 0, min: 0 })
  points: number;

  @Prop({ required: true, default: 0, min: 0 })
  exps: number;

  @Prop({ required: true, default: 0, min: 0 })
  nextLevelCost: number;
}

@Schema({ collection: 'tokens' })
export class TokenSchemaClass extends EntityDocumentHelper {
  @Prop({ required: true, index: true, unique: true })
  textId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({
    type: String,
    default: null,
  })
  imageSrc?: string | null;

  @Prop({ required: true, default: 1, min: 1 })
  maxLevel: number;

  @Prop({ type: [TokenLevelSchemaClass] })
  levels: TokenLevelSchemaClass[];

  @Prop({ default: true, required: true })
  state: boolean;
}

export const TokenSchema = SchemaFactory.createForClass(TokenSchemaClass);
