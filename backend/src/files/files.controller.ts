import { Controller, Get, Post, Request, UploadedFile, HttpStatus, Res, Param } from '@nestjs/common';
import { Response } from 'express';
import { ApiTags, ApiBearerAuth, ApiOkResponse, ApiProduces, ApiParam } from '@nestjs/swagger';
import { ApiFile } from './decorator/api-file.decorator';
import { FilesService } from './files.service';

@ApiBearerAuth()
@ApiTags('Files')
@Controller({ path: 'files', version: '1' })
export class FilesController {
    constructor(private fileServices: FilesService) { }

    @ApiOkResponse({
        schema: {
            type: 'string',
            format: 'binary',
        },
    })
    @ApiProduces('image/jpg')
    @Get('/profile-image')
    async getProfileImage(@Request() req, @Res() res: Response) {

        const player = await this.fileServices.getProfileById(req.user.playerId);
        if (!player) {
            return res.status(HttpStatus.NOT_FOUND).send();
        }

        res.contentType('image/jpg');
        return res.sendFile(player.imageSrc, { root: process.cwd() });
    }

    @Post('/profile-image')
    @ApiFile('profileImage', true)
    async uploadProfileImage(@Request() req, @UploadedFile() profileImage: Express.Multer.File) {

        console.log(profileImage);
        await this.fileServices.updateProfileImage(req.user.playerId, profileImage);
    }

    @ApiOkResponse({
        schema: {
            type: 'string',
            format: 'binary',
        },
    })
    @ApiProduces('image/jpg')
    @ApiParam({ name: 'textId', type: String, required: true })
    @Get('/token-image/:tokenId')
    async getTokenImage(@Param('textId') textId: string, @Res() res: Response) {

        const token = await this.fileServices.getTokenById(textId);
        if (!token) {
            return res.status(HttpStatus.NOT_FOUND).send();
        }

        res.contentType('image/jpg');
        return res.sendFile(token.imageSrc, { root: process.cwd() });
    }

    @ApiFile('tokenImage', true)
    @ApiParam({ name: 'textId', type: String, required: true })
    @Post('/token-image/:tokenId')
    async uploadTokenImage(@Param('textId') textId: string, @UploadedFile() tokenImage: Express.Multer.File) {

        console.log(tokenImage);
        await this.fileServices.updateTokenImage(textId, tokenImage);
    }
}