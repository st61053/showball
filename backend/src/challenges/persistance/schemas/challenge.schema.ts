import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { EntityDocumentHelper } from 'src/utils/document-entity-helper';

export type ChallengeSchemaDocument = HydratedDocument<ChallengeSchemaClass>;

@Schema({ collection: 'challenges' })
export class ChallengeSchemaClass extends EntityDocumentHelper {
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

  @Prop({ required: true, default: 0, min: 0 })
  points: number;

  @Prop({ required: true, default: 0, min: 0 })
  coins: number;

  @Prop({ required: true, default: 0, min: 0 })
  exps: number;

  @Prop({ required: true })
  fromDate: Date;

  @Prop({ required: true })
  toDate: Date;

  @Prop({ default: true, required: true })
  state: boolean;
}

export const ChallengeSchema =
  SchemaFactory.createForClass(ChallengeSchemaClass);
