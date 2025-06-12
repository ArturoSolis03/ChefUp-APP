import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
  UseGuards,
} from '@nestjs/common';
import { OutService } from './out.service';
import { SignUpDto } from './dto/singup.dto';
import { SignInDto } from './dto/singin.dto';
import { Tokens } from './types';
import { GetCurrentUser } from 'src/auth/decorators/get-current-user.decorator';
import { GetCurrentUserId } from 'src/auth/decorators/get-current.user-id.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guards';
import { RefreshTokenGuard } from 'src/auth/guards/refresh-token.guard';

@Controller('auth')
export class OutController {
  constructor(private outService: OutService) {}

  // SYNC UP: Registro de usuario
  @Post('signup')
  signup(@Body() dto: SignUpDto): Promise<Tokens> {
    return this.outService.signup(dto);
  }

  // SYNC IN: Login
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(@Body() dto: SignInDto): Promise<Tokens> {
    return this.outService.signin(dto);
  }

  // LOGOUT
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout(@GetCurrentUserId() userId: string) {
    return this.outService.logout(userId);
  }

  // REFRESH TOKENS
  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  refreshTokens(
    @GetCurrentUserId() userId: string,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ): Promise<Tokens> {
    return this.outService.refreshTokens(userId, refreshToken);
  }
}
