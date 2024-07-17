import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateChallengeDto } from './create-challenge.dto';
import { IsOptional } from 'class-validator';

export class UpdateChallengeDto extends PartialType(CreateChallengeDto) {
  @ApiProperty({ example: true })
  @IsOptional()
  state: boolean;
}
