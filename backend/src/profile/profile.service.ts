import { Injectable } from '@nestjs/common';
import { PlayersService } from 'src/players/players.service';
import { Player } from 'src/database/player.model';
import { readFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class ProfileService {
    constructor(
        private playersService: PlayersService,
    ) { }

    async getProfileById(playerId: string): Promise<Player> {
        const player = await this.playersService.findById(playerId);
        return player;
    }

    async updateProfileImage(playerId: string, image: Express.Multer.File) {
        const player = await this.getProfileById(playerId);
        player.imageSrc = `${image.destination}/${image.filename}`
        player.save();
    }

    async getProfileImage(playerId: string) {
        const player = await this.getProfileById(playerId);

        return readFileSync(join(process.cwd(), player.imageSrc));
    }
}
