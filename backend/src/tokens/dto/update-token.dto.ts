import { PartialType, OmitType, ApiProperty } from '@nestjs/swagger';
import { CreateTokenDto } from './create-token.dto';
import { IsOptional } from 'class-validator';

export class UpdateTokenDto extends OmitType(PartialType(CreateTokenDto), [
  'textId',
] as const) {
  @ApiProperty({ example: true })
  @IsOptional()
  state: boolean;
}
