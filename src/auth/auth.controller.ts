import {
  Body,
  Controller,
  Headers,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { jwtAuthGuard } from '../common/guards/token.guard';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() body: CreateUserDto) {
    return this.authService.signup(body);
  }

  @Patch(':token/verify')
  verify(@Param('token') token: string) {
    return this.authService.verifyToken(token);
  }

  @Post('login')
  login(@Body() body: LoginUserDto) {
    return this.authService.signin(body);
  }

  @UseGuards(jwtAuthGuard)
  @Post('logout')
  logout(@Headers('Authorization') token: string) {
    return this.authService.logout(token);
  }

  @Post('refresh-token')
  refreshToken(@Headers('Authorization') token: string) {
    return this.authService.refreshToken(token);
  }

  @Post('password/recovery')
  recoveryPassword(@Body() email: string) {
    return this.authService.recoveryPassword(email);
  }

  @Post('password/reset')
  resetPassword(@Body() body: { token: string; password: string }) {
    return this.authService.resetPassword(body.token, body.password);
  }
}
