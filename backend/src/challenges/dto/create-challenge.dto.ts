import { IsString, IsNumber, Min, IsNotEmpty, Length, IsAlphanumeric, IsDateString } from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class CreateChallengeDto {
    @ApiProperty({ example: 'kozel' })
    @IsString()
    @IsAlphanumeric()
    @IsNotEmpty()
    @Length(3, 16)
    textId: string;

    @ApiProperty({ example: 'Kozel' })
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'This is a token description' })
    @IsString()
    description: string;

    @ApiProperty({ example: 10 })
    @IsNumber()
    @Min(0)
    @Type(() => Number)
    points: number;

    @ApiProperty({ example: 15 })
    @IsNumber()
    @Min(0)
    @Type(() => Number)
    coins: number;

    @ApiProperty({ example: 6 })
    @IsNumber()
    @Min(0)
    @Type(() => Number)
    exps: number;

    @ApiProperty({ example: new Date('2024-07-21T00:00:00.000Z') })
    fromDate: Date;

    @ApiProperty({ example: new Date('2024-07-25T00:00:00.000Z') })
    toDate: Date;
}
