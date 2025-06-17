import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Req,
} from '@nestjs/common';
import { OutService } from './out.service';
import { SignUpDto } from './dto/singup.dto';
import { SignInDto } from './dto/singin.dto';
import { Tokens } from './types';
import { GetCurrentUser } from 'src/auth/decorators/get-current-user.decorator';
import { GetCurrentUserId } from 'src/auth/decorators/get-current.user-id.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guards';
import { RefreshTokenGuard } from 'src/auth/guards/refresh-token.guard';
import {
  ApiTags,
  ApiBody,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { TokensDto } from './dto/tokens.dto';

@ApiTags('Auth')
@Controller('auth')
export class OutController {
  constructor(private outService: OutService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Register new user' })
  @ApiBody({ type: SignUpDto })
  @ApiResponse({
    status: 201,
    description: 'User registered successfully',
    type: TokensDto,
  })
  signup(@Body() dto: SignUpDto): Promise<Tokens> {
    return this.outService.signup(dto);
  }

  @Post('validate')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Validate token' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Token is valid' })
  async validate(@Req() req: any) {
    return req.user;
  }

  // SYNC IN: Login
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  @ApiOperation({ summary: 'User login' })
  @ApiBody({ type: SignInDto })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    type: TokensDto,
  })
  signin(@Body() dto: SignInDto): Promise<Tokens> {
    return this.outService.signin(dto);
  }

  // LOGOUT
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @ApiOperation({ summary: 'Logout user' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'User logged out' })
  logout(@GetCurrentUserId() userId: string) {
    return this.outService.logout(userId);
  }

  // REFRESH TOKENS
  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  @ApiOperation({ summary: 'Refresh access/refresh tokens' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Tokens refreshed',
    type: TokensDto,
  })
  refreshTokens(
    @GetCurrentUserId() userId: string,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ): Promise<Tokens> {
    return this.outService.refreshTokens(userId, refreshToken);
  }
}