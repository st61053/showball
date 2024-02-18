import { Injectable } from '@nestjs/common';
import { PlayersService } from 'src/players/players.service';
import { Player } from 'src/players/domain/player';
import { TokensService } from 'src/tokens/tokens.service';

@Injectable()
export class FilesService {
    constructor(
        private playersService: PlayersService,
        private tokensService: TokensService,
    ) { }

    async getProfileById(playerId: string): Promise<Player | null> {
        return this.playersService.findOne({ id: playerId });
    }

    async getTokenById(textId: string) {
        return this.tokensService.findOne({ textId: textId });
    }

    async updateProfileImage(playerId: string, image: Express.Multer.File) {
        const player = await this.playersService.update(playerId, { imageSrc: `/${image.path}` });
    }

    async updateTokenImage(textId: string, image: Express.Multer.File) {
        const token = await this.tokensService.update(textId, { imageSrc: `/${image.path}` });
    }
}