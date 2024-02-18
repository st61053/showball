import { ApiProperty } from "@nestjs/swagger";

export class TokenLevel {
    coins: number;
    points: number;
    exps: number;
    nextLevelCost: number;
}

export class Token {
    @ApiProperty({ example: 'kozel' })
    textId: string;

    @ApiProperty({ example: 'Kozel' })
    name: string;

    @ApiProperty({ example: 'Kozel is a beer.' })
    description: string;

    @ApiProperty({ example: './uploads/tokens/kozel.png' })
    imageSrc?: string | null;

    @ApiProperty({ example: [{ coins: 10, points: 15, exps: 6, nextLevelCost: 100 }] })
    levels: TokenLevel[];

    @ApiProperty({ example: 3 })
    maxLevel: number;

    @ApiProperty({ example: true })
    state: boolean;

}