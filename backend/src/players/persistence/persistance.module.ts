import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayerSchema, PlayerSchemaClass } from './schemas/player.schema';
import { PlayerRepository } from './repositories/player.repository';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: PlayerSchemaClass.name, schema: PlayerSchema },
        ]),
    ],
    providers: [PlayerRepository],
    exports: [PlayerRepository],
})
export class PlayersPersistenceModule { }