import { IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { CreateTokenDto } from "./create-token.dto";

export class TokenDTO extends CreateTokenDto {

    @ApiProperty({ example: './uploads/tokens/kozel.png' })
    @IsOptional()
    @IsString()
    imageSrc: string;
}