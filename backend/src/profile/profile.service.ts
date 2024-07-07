import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PlayersService } from 'src/players/players.service';
import { TokensService } from 'src/tokens/tokens.service';
import { ChallengesService } from 'src/challenges/challenges.service';
import { Player } from 'src/players/domain/player';
import { assert } from 'console';

@Injectable()
export class ProfileService {
  constructor(
    private playersService: PlayersService,
    private tokensService: TokensService,
    private challengesService: ChallengesService,
  ) {}

  async getProfileById(playerId: string): Promise<Player | null> {
    return this.playersService.findOne({ id: playerId });
  }

  async showToken(
    playerId: string,
    tokenTextId: string,
  ): Promise<Player | null> {
    const player = await this.playersService.findOne({ id: playerId });

    assert(player, 'Player not found');

    const token = await this.tokensService.findOne({ textId: tokenTextId });

    if (!token) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          errors: {
            token: 'notFound',
          },
        },
        HttpStatus.NOT_FOUND,
      );
    }

    if (!token.state) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          errors: {
            token: 'notActiveToken',
          },
        },
        HttpStatus.CONFLICT,
      );
    }

    if (!player.tokens.some((stats) => stats.textId === tokenTextId)) {
      player.tokens.push({
        textId: tokenTextId,
        count: 0,
        level: 1,
      });
    }

    const playerTokenStats = player.tokens.find(
      (stats) => stats.textId === tokenTextId,
    );

    playerTokenStats.count++;

    const tokenLevel = Math.min(playerTokenStats.level, token.levels.length);

    player.stats.coins += token.levels[tokenLevel - 1].coins;
    player.stats.points += token.levels[tokenLevel - 1].points;
    player.stats.exps += token.levels[tokenLevel - 1].exps;

    return this.playersService.update(player.id, {
      tokens: player.tokens,
      stats: player.stats,
    });
  }

  async upgradeToken(
    playerId: string,
    tokenTextId: string,
  ): Promise<Player | null> {
    const player = await this.playersService.findOne({ id: playerId });

    assert(player, 'Player not found');

    const token = await this.tokensService.findOne({ textId: tokenTextId });

    if (!token) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          errors: {
            token: 'notFound',
          },
        },
        HttpStatus.NOT_FOUND,
      );
    }

    if (!player.tokens.some((stats) => stats.textId === tokenTextId)) {
      player.tokens.push({
        textId: tokenTextId,
        count: 0,
        level: 1,
      });
    }

    const playerTokenStats = player.tokens.find(
      (stats) => stats.textId === tokenTextId,
    );

    if (
      playerTokenStats.level >= Math.min(token.maxLevel, token.levels.length)
    ) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          errors: {
            token: 'maxLevelReached',
          },
        },
        HttpStatus.CONFLICT,
      );
    }

    const tokenLevel = Math.min(playerTokenStats.level, token.levels.length);

    if (player.stats.coins < token.levels[tokenLevel - 1].nextLevelCost) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          errors: {
            coins: 'notEnoughCoins',
          },
        },
        HttpStatus.CONFLICT,
      );
    }

    player.stats.coins -= token.levels[tokenLevel - 1].nextLevelCost;
    playerTokenStats.level++;

    return this.playersService.update(player.id, {
      tokens: player.tokens,
      stats: player.stats,
    });
  }

  async meetChallenge(
    playerId: string,
    challengeTextId: string,
  ): Promise<Player | null> {
    const player = await this.playersService.findOne({ id: playerId });

    // TODO: Implement the meetChallenge method

    return player;
  }
}
