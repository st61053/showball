import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOkResponse, ApiBody, } from '@nestjs/swagger';
import { AccessTokenDTO } from './dto/access-token.dto';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { LoginDTO } from './dto/login.dto';
import { Public } from './decorator/public.decorator';

@ApiTags('Auth')
@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private authService: AuthService) { }

  @Public()
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginDTO })
  @ApiOkResponse({ description: 'Login', type: AccessTokenDTO })
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
