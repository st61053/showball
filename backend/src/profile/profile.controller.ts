import { Controller, Get, Post, Put, Request, UploadedFile, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
import { ProfileService } from './profile.service';
import { ApiTags, ApiBearerAuth, ApiOkResponse, ApiProduces } from '@nestjs/swagger';
import { PlayerDTO } from 'src/players/dto/player.dto';
import { ApiFile } from 'src/common/decorator/api-file.decorator';
import { ParseFilePipeBuilder } from '@nestjs/common';
import { diskStorage } from 'multer';
import * as path from 'path';

const MAX_PROFILE_PICTURE_SIZE_IN_BYTES = 2 * 1024 * 1024;

const defaultConfig = diskStorage({
    destination: './uploads/profiles',
    filename: function (req, file, cb) {
        const randomName = Array(10)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
        cb(null, `${randomName}${path.extname(file.originalname)}`)
    }
})

@ApiBearerAuth()
@ApiTags('Profile')
@Controller({ path: 'profile', version: '1' })
export class ProfileController {
    constructor(private profileServices: ProfileService) { }

    @ApiOkResponse({ description: 'Gets profile of logged player.', type: PlayerDTO })
    @Get('/')
    async getPlayerProfile(@Request() req) {
        const player = await this.profileServices.getProfileById(req.user.playerId);

        return PlayerDTO.from(player);
    }

    @ApiOkResponse({
        schema: {
            type: 'string',
            format: 'binary',
        },
    })
    @ApiProduces('image/jpg')
    @Get('/image')
    async getImage(@Request() req, @Res() res: Response) {
        const file = await this.profileServices.getProfileImage(req.user.playerId);

        res.contentType('image/jpg');
        res.send(file);
    }

    @Put('/image')
    @ApiFile('profileImage', true, { storage: defaultConfig })
    async uploadImage(@Request() req, @UploadedFile(new ParseFilePipeBuilder()
        .addFileTypeValidator({
            fileType: 'jpeg',
        })
        .addMaxSizeValidator({
            maxSize: MAX_PROFILE_PICTURE_SIZE_IN_BYTES
        })
        .build({
            errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
        }),) profileImage: Express.Multer.File) {

        console.log(profileImage);
        await this.profileServices.updateProfileImage(req.user.playerId, profileImage);
    }

    @Post('/show-token')
    async showToken(@Request() req) {
        //
    }

    @Post('/meet-challenge')
    async meetChallenge(@Request() req) {
        //
    }

    @Post('/upgrade-token')
    async upgradeToken(@Request() req) {
        //
    }
}
