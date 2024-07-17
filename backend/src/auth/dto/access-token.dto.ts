import { ApiProperty } from '@nestjs/swagger';

export class AccessTokenDTO {
  @ApiProperty({ example: 'access-token' })
  access_token: string;
}
