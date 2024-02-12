import { PartialType, OmitType } from '@nestjs/swagger';
import { CreateTokenDto } from './create-token.dto';

export class UpdateTokenDto extends OmitType(PartialType(CreateTokenDto), ["textId"] as const) { }
