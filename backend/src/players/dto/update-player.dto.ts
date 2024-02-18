import { CreatePlayerDTO } from './create-player.dto';
import { OmitType } from '@nestjs/mapped-types';

export class UpdatePlayerDTO extends OmitType(CreatePlayerDTO, [
  'password',
  'email',
]) { }
