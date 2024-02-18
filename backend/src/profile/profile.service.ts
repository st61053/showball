import { Injectable } from '@nestjs/common';
import { PlayersService } from 'src/players/players.service';
import { Player } from 'src/players/domain/player';

@Injectable()
export class ProfileService {
    constructor(
        private playersService: PlayersService,
    ) { }

    async getProfileById(playerId: string): Promise<Player | null> {
        return this.playersService.findOne({ id: playerId });
    }
}
