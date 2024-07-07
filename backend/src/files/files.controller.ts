import {
  Controller,
  Post,
  Request,
  UploadedFile,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { ApiFile } from './decorator/api-file.decorator';
import { FilesService } from './files.service';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { RoleEnum } from 'src/shared/enum/role-type.enum';
import { RolesGuard } from 'src/auth/guard/roles.guard';

@ApiBearerAuth()
@ApiTags('Files')
@Controller({ path: 'files', version: '1' })
export class FilesController {
  constructor(private fileServices: FilesService) {}

  @Post('/profile-image')
  @ApiFile('profileImage', true)
  async uploadProfileImage(
    @Request() req,
    @UploadedFile() profileImage: Express.Multer.File,
  ) {
    console.log(profileImage);
    await this.fileServices.updateProfileImage(req.user.playerId, profileImage);
  }

  @Roles(RoleEnum.admin)
  @UseGuards(RolesGuard)
  @Post('/token-image/:textId')
  @ApiFile('tokenImage', true)
  @ApiParam({ name: 'textId', type: String, required: true })
  async uploadTokenImage(
    @Param('textId') textId: string,
    @UploadedFile() tokenImage: Express.Multer.File,
  ) {
    console.log(tokenImage);
    await this.fileServices.updateTokenImage(textId, tokenImage);
  }
}
