import { IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class TokenLevelDTO {

    @ApiProperty({ example: 1 })
    @IsNumber()
    @Min(0)
    @Type(() => Number)
    points: number;

    @ApiProperty({ example: 1 })
    @IsNumber()
    @Min(0)
    @Type(() => Number)
    coins: number;

    @ApiProperty({ example: 1 })
    @IsNumber()
    @Min(0)
    @Type(() => Number)
    exps: number;
}