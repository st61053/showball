import { IsPositive, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationQueryDto {
  @ApiProperty({ required: true, default: 10 })
  @IsPositive()
  @Type(() => Number)
  limit: number;

  @ApiProperty({ required: true, default: 0 })
  @Min(0)
  @Type(() => Number)
  offset: number;
}
