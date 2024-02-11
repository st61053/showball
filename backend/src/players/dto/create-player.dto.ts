import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsNotEmpty,
  IsAlphanumeric,
  ArrayMaxSize,
  ArrayMinSize,
  Length,
} from 'class-validator';

export class CreatePlayerDTO {
  @ApiProperty({ example: 'username' })
  @IsNotEmpty()
  @IsString()
  @IsAlphanumeric()
  @Length(3, 16)
  username: string;

  @ApiProperty({ example: 'username@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'secret-password' })
  @IsNotEmpty()
  @IsString()
  @Length(3, 50)
  password: string;

  @ApiProperty({ example: ['greenhorn'] })
  @ArrayMinSize(1)
  @ArrayMaxSize(5)
  @Length(3, 16, { each: true })
  titles: string[];
}
