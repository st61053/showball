import { Player, PlayerStats } from '../../domain/player';
import {
  PlayerSchemaClass,
  PlayerStatsSchemaClass,
} from '../schemas/player.schema';

export class PlayerMapper {
  static toDomain(raw: PlayerSchemaClass): Player {
    const player = new Player();
    player.id = raw._id.toString();
    player.email = raw.email;
    player.username = raw.username;
    player.password = raw.password;
    player.roles = raw.roles;
    player.imageSrc = raw.imageSrc;
    player.titles = raw.titles;

    const playerStats = new PlayerStats();
    playerStats.coins = raw.stats.coins;
    playerStats.points = raw.stats.points;
    playerStats.exps = raw.stats.exps;
    playerStats.straight = raw.stats.straight;
    playerStats.free_spin = raw.stats.free_spin;

    player.stats = playerStats;
    player.tokens = raw.tokens.map((token) => ({
      textId: token.textId,
      count: token.count,
      level: token.level,
    }));
    player.challenges = raw.challenges.map((challenge) => ({
      textId: challenge.textId,
      timestamp: challenge.timestamp,
    }));
    return player;
  }

  static toPersistence(player: Omit<Player, 'id'>): PlayerSchemaClass {
    const playerDoc = new PlayerSchemaClass();
    playerDoc.email = player.email;
    playerDoc.username = player.username;
    playerDoc.password = player.password;
    playerDoc.roles = player.roles;
    playerDoc.titles = player.titles;

    const playerStatsDoc = new PlayerStatsSchemaClass();
    playerStatsDoc.coins = player.stats.coins;
    playerStatsDoc.points = player.stats.points;
    playerStatsDoc.exps = player.stats.exps;
    playerStatsDoc.straight = player.stats.straight;
    playerStatsDoc.free_spin = player.stats.free_spin;

    playerDoc.stats = playerStatsDoc;

    playerDoc.tokens = player.tokens.map((token) => ({
      textId: token.textId,
      count: token.count,
      level: token.level,
    }));
    playerDoc.challenges = player.challenges.map((challenge) => ({
      textId: challenge.textId,
      timestamp: challenge.timestamp,
    }));
    return playerDoc;
  }
}
