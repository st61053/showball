import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { RoleEnum } from 'src/shared/enum/role-type.enum';

export class PlayerStats {
  coins: number;
  points: number;
  exps: number;
}

export class TokenStats {
  textId: string;
  count: number;
  level: number;
}

export class ChallengeStats {
  textId: string;
  fulfilled: boolean;
  timestamp: Date;
}

export class Player {
  @ApiProperty({ example: '5f7a1c1e9b5f1f1d2c5d9c3b' })
  id: string;

  @Exclude()
  email: string;

  @ApiProperty({ example: 'username' })
  username: string;

  @Exclude()
  password: string;

  @ApiProperty({ example: ['user'] })
  roles: RoleEnum[];

  @ApiProperty({ example: ['greenhorn'] })
  titles: string[];

  @ApiProperty({ example: './uploads/profiles/image.png' })
  imageSrc?: string | null;

  @ApiProperty({ example: { coins: 10, points: 15, exps: 6 } })
  stats: PlayerStats;

  @ApiProperty({ example: [{ textId: 'kozel', count: 5, level: 1 }] })
  tokens: TokenStats[];

  @ApiProperty({
    example: [
      {
        textId: 'hotdog',
        fulfilled: true,
        timestamp: '2024-07-25T00:00:00.000Z',
      },
    ],
  })
  challenges: ChallengeStats[];
}
