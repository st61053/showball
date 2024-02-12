import { IsString, IsPositive, IsNotEmpty, Length, IsAlphanumeric, IsArray, ValidateNested, ArrayMinSize, ArrayMaxSize } from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { TokenLevelDTO } from "./token-level.dto";

export class CreateTokenDto {

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

    @ApiProperty({ example: [{ points: 1, coins: 1, exps: 1 }] })
    @IsArray()
    @ArrayMinSize(1)
    @ArrayMaxSize(10)
    @ValidateNested({ each: true })
    @Type(() => TokenLevelDTO)
    levels: TokenLevelDTO[];

    @ApiProperty({ example: 3 })
    @IsPositive()
    @Type(() => Number)
    maxLevel: number;
}
