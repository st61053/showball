import { ApiProperty } from '@nestjs/swagger';
import { PlayerStatsDTO } from './player-stats.dto';
import { Player } from '../../database/player.model';

export class PlayerDTO {

  @ApiProperty({ example: '5f7a1c1e9b5f1f1d2c5d9c3b' })
  playerId: string

  @ApiProperty({ example: 'username' })
  username: string;

  @ApiProperty({ example: 'username@gmail.com' })
  email: string;

  @ApiProperty({ example: './data/images/profile.png' })
  imageSrc: string;

  @ApiProperty()
  stats: PlayerStatsDTO;

  @ApiProperty({ example: ['greenhorn'] })
  titles: string[];

  static from(player: Player): PlayerDTO {
    const { username, email, imageSrc, stats, titles } = player;
    const playerDTO = new PlayerDTO();
    playerDTO.playerId = player._id.toString();
    playerDTO.username = username;
    playerDTO.email = email;
    playerDTO.imageSrc = imageSrc;
    playerDTO.stats = stats;
    playerDTO.titles = titles;
    return playerDTO;
  }
}
