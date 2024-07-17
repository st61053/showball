import { ApiProperty } from "@nestjs/swagger";

export class Challenge {

    @ApiProperty({ example: 'ututatise' })
    textId: string;

    @ApiProperty({ example: 'Ututatise' })
    name: string;

    @ApiProperty({ example: 'Ututatise is a beer.' })
    description: string;

    @ApiProperty({ example: './uploads/challenges/ututatise.png' })
    imageSrc?: string | null;

    @ApiProperty({ example: 10 })
    points: number;

    @ApiProperty({ example: 15 })
    coins: number;

    @ApiProperty({ example: 6 })
    exps: number;

    @ApiProperty({ example: new Date('2024-07-21T00:00:00.000Z') })
    fromDate: Date;

    @ApiProperty({ example: new Date('2024-07-25T00:00:00.000Z') })
    toDate: Date;

    @ApiProperty({ example: true })
    state: boolean;
}