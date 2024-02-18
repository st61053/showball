import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TokenSchema, TokenSchemaClass } from './schemas/token.schema';
import { TokenRepository } from './repositories/token.repository';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: TokenSchemaClass.name, schema: TokenSchema },
        ]),
    ],
    providers: [TokenRepository],
    exports: [TokenRepository],
})
export class TokensPersistenceModule { }