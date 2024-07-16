import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PlayersService } from 'src/players/players.service';
import { TokensService } from 'src/tokens/tokens.service';
import { ChallengesService } from 'src/challenges/challenges.service';
import { Player } from 'src/players/domain/player';
import { assert } from 'console';
import { UpdateStatsDto } from './dto/update-stats.dto';

@Injectable()
export class ProfileService {
  constructor(
    private playersService: PlayersService,
    private tokensService: TokensService,
    private challengesService: ChallengesService,
  ) {}

  STRAIGHT_COINS = 10;
  STRAIGHT_POINTS = 10;
  STRAIGHT_EXPS = 0;

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

    //Straight logic

    const tokens = await this.tokensService.findAll({ page: 1, limit: 0 });

    if (
      tokens.length === player.tokens.length &&
      player.tokens.every((token) => token.count > player.stats.straight)
    ) {
      const minStraight = Math.min(
        ...player.tokens.map((token) => token.count),
      );

      const straightDiv = minStraight - player.stats.straight;

      player.stats.coins += straightDiv * this.STRAIGHT_COINS;
      player.stats.points += straightDiv * this.STRAIGHT_POINTS;
      player.stats.exps += straightDiv * this.STRAIGHT_EXPS;
      player.stats.straight = minStraight;
    }

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

    const challenge = await this.challengesService.findOne({
      textId: challengeTextId,
    });

    if (!challenge) {
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

    const now = new Date();

    if (challenge.fromDate > now || challenge.toDate < now) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          errors: {
            token: 'notActiveChallenge',
          },
        },
        HttpStatus.CONFLICT,
      );
    }

    if (
      !player.challenges.find(
        (challenge) => challenge.textId == challenge.textId,
      )
    ) {
      player.challenges.push({
        textId: challengeTextId,
        timestamp: now,
      });

      player.stats.coins += challenge.coins;
      player.stats.points += challenge.points;
      player.stats.exps += challenge.exps;
    } else {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          errors: {
            token: 'challengeAlreadyMet',
          },
        },
        HttpStatus.CONFLICT,
      );
    }
    return this.playersService.update(player.id, {
      challenges: player.challenges,
      stats: player.stats,
    });
  }

  async updateStats(playerId: string, updateStatsDto: UpdateStatsDto) {
    const player = await this.playersService.findOne({ id: playerId });

    if (player.stats.coins + updateStatsDto.coins < 0) {
      player.stats.coins = 0;
    } else {
      player.stats.coins += updateStatsDto.coins;
    }

    if (player.stats.points + updateStatsDto.points < 0) {
      player.stats.points = 0;
    } else {
      player.stats.points += updateStatsDto.points;
    }

    if (player.stats.exps + updateStatsDto.exps < 0) {
      player.stats.exps = 0;
    } else {
      player.stats.exps += updateStatsDto.exps;
    }

    return this.playersService.update(player.id, {
      stats: player.stats,
    });
  }
}
