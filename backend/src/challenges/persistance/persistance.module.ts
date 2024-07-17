import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChallengeSchema, ChallengeSchemaClass } from './schemas/challenge.schema';
import { ChallengeRepository } from './repositories/challenge.repository';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: ChallengeSchemaClass.name, schema: ChallengeSchema },
        ]),
    ],
    providers: [ChallengeRepository],
    exports: [ChallengeRepository],
})
export class ChallengesPersistenceModule { }