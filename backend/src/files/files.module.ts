import { Module, HttpException, HttpStatus } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { diskStorage } from 'multer';
import { existsSync, mkdirSync } from 'fs';
import { extname } from 'path';
import { v4 as uuid } from 'uuid';
import { FilesService } from './files.service';
import { PlayersModule } from 'src/players/players.module';
import { FilesController } from './files.controller';
import { TokensModule } from 'src/tokens/tokens.module';

@Module({
    imports: [PlayersModule, TokensModule, MulterModule.registerAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => {
            return {
                limits: {
                    fileSize: configService.get('file.maxFileSize', { infer: true }),
                },
                fileFilter: (req: any, file: any, cb: any) => {
                    if (!file.originalname.match(/\.(jpg|jpeg|png)$/i)) {
                        return cb(
                            new HttpException(
                                {
                                    status: HttpStatus.UNPROCESSABLE_ENTITY,
                                    errors: {
                                        file: `cantUploadFileType`,
                                    },
                                },
                                HttpStatus.UNPROCESSABLE_ENTITY,
                            ),
                            false,
                        );
                    }

                    cb(null, true);
                },
                storage: diskStorage({
                    destination: (req: any, file: any, cb: any) => {
                        const uploadPath = configService.get('file.uploadLocation', { infer: true });
                        if (!existsSync(uploadPath)) {
                            mkdirSync(uploadPath);
                        }
                        cb(null, uploadPath);
                    },
                    filename: (req: any, file: any, cb: any) => {
                        cb(null, `${uuid()}${extname(file.originalname)}`);
                    },
                }),
            };
        },
    }),],
    providers: [FilesService],
    exports: [FilesService],
    controllers: [FilesController],
})
export class FilesModule { }