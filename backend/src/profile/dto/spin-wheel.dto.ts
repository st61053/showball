import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SpinWheelDto {
  @ApiProperty({ example: 7 })
  @IsNumber()
  prize: number;
}
