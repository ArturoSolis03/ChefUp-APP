import { Injectable, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/users/user.service';
import { ConfigService } from '@nestjs/config';
import { SignUpDto } from './dto/singup.dto';
import { SignInDto } from './dto/singin.dto';
import { Tokens } from './types';

@Injectable()
export class OutService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signup(dto: SignUpDto): Promise<Tokens> {
    const existingUser = await this.userService.findByEmail(dto.email);
    if (existingUser) {
      throw new ForbiddenException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const newUser = await this.userService.create({
      ...dto,
      password: hashedPassword,
    });

    const userObject = newUser.toJSON();

    return this.getTokens(userObject.id, userObject.email, userObject.name);
  }

  async signin(dto: SignInDto): Promise<Tokens> {
    const user = await this.userService.findByEmail(dto.email);
    if (!user) {
      throw new ForbiddenException('Invalid credentials');
    }

    const passwordMatches = await bcrypt.compare(dto.password, user.password);
    if (!passwordMatches) {
      throw new ForbiddenException('Invalid credentials');
    }

    const userObject = user.toJSON();

    return this.getTokens(userObject.id, userObject.email, userObject.name);
  }

  async logout(userId: string): Promise<{ message: string }> {
    return { message: `User ${userId} logged out` };
  }

  async refreshTokens(userId: string, refreshToken: string): Promise<Tokens> {
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new ForbiddenException('Access denied');
    }

    try{
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
      });

      if(payload.sub !== userId){
        throw new ForbiddenException('Token does not match user');
      }

      const userObject = user.toJSON();
      return this.getTokens(userObject.id, userObject.email, userObject.name);
    }catch (err){
      throw new ForbiddenException('Invalid or expired refresh token');
    }

    

  }

  async getTokens(
    userId: string,
    email: string,
    name: string,
  ): Promise<Tokens> {
    const payload = { sub: userId, email, name };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
      expiresIn:
        this.configService.get<string>('ACCESS_TOKEN_EXPIRATION') || '900s',
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
      expiresIn:
        this.configService.get<string>('REFRESH_TOKEN_EXPIRATION') || '7d',
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
