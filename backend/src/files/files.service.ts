import { Injectable } from '@nestjs/common';
import { PlayersService } from 'src/players/players.service';
import { TokensService } from 'src/tokens/tokens.service';
import { ChallengesService } from 'src/challenges/challenges.service';

@Injectable()
export class FilesService {
  constructor(
    private playersService: PlayersService,
    private tokensService: TokensService,
    private challengesService: ChallengesService,
  ) {}

  async updateProfileImage(playerId: string, image: Express.Multer.File) {
    const player = await this.playersService.update(playerId, {
      imageSrc: `${image.path}`,
    });
  }

  async updateTokenImage(textId: string, image: Express.Multer.File) {
    const token = await this.tokensService.update(textId, {
      imageSrc: `${image.path}`,
    });
  }

  async updateChallengeImage(textId: string, image: Express.Multer.File) {
    const token = await this.challengesService.update(textId, {
      imageSrc: `${image.path}`,
    });
  }
}
