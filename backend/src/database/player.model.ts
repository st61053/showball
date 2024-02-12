import { hash } from 'bcrypt';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { RoleType } from 'src/shared/enum/role-type.enum';

export type PlayerModel = mongoose.Model<Player>;

@Schema({ _id: false })
class PlayerStats {
  @Prop({ required: true, default: 0, min: 0 })
  points: number;

  @Prop({ required: true, default: 0, min: 0 })
  coins: number;

  @Prop({ required: true, default: 0, min: 0 })
  exp: number;
}

@Schema({ _id: false })
class TokenStats {
  @Prop({ required: true })
  textId: string;

  @Prop({ required: true, default: 0, min: 0 })
  count: number;

  @Prop({ required: true, default: 1, min: 1 })
  level: number;

  @Prop({
    type: String,
    required: true,
    default: RoleType.User,
    enum: [RoleType.User, RoleType.Admin],
  })
  skin: string;
}

@Schema({ _id: false })
class ChallengeStats {
  @Prop({ required: true })
  textId: string;

  @Prop()
  fulfilled: boolean;

  @Prop()
  timestamp: Date;
}

@Schema({ timestamps: true })
class Player extends mongoose.Document {
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true, index: true, unique: true })
  email: string;

  @Prop({ required: true, index: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  imageSrc: string;

  @Prop({ type: PlayerStats, required: true, default: new PlayerStats() })
  stats: PlayerStats;

  @Prop({ type: [TokenStats] })
  tokens: TokenStats[];

  @Prop({ type: [ChallengeStats] })
  challenges: ChallengeStats[];

  @Prop({ type: [String] })
  titles: string[];

  @Prop({ type: [String], required: true, default: [RoleType.User] })
  roles: RoleType[];
}

const PlayerSchema = SchemaFactory.createForClass(Player);

PlayerSchema.pre('save', function (next) {
  const user = this;

  if (this.isModified('password') || this.isNew) {
    hash(user.password, 12, function (hashError, hash) {
      if (hashError) {
        return next(hashError);
      }

      user.password = hash;
      next();
    });
  } else {
    return next();
  }
});

export { Player, PlayerSchema };
