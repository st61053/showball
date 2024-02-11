import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { SignInDTO } from './dto/sign-in.dto';
import { AccessTokenDTO } from './dto/access-token.dto';

@ApiTags('Auth')
@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @ApiOkResponse({ description: 'Player', type: AccessTokenDTO })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() body: SignInDTO) {
    return this.authService.signIn(body.username, body.password);
  }
}
