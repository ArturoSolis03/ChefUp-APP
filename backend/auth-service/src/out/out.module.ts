import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { OutController } from './out.controller';
import { OutService } from './out.service';
import { UserModule } from 'src/users/user.module';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';
import { JwtRefreshStrategy } from 'src/auth/strategy/jwt-refresh.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('ACCESS_TOKEN_SECRET'),
        signOptions: {
          expiresIn: config.get<string>('ACCESS_TOKEN_EXPIRATION'),
        },
      }),
    }),
    UserModule,
  ],
  controllers: [OutController],
  providers: [OutService, JwtStrategy, JwtRefreshStrategy],
})
export class OutModule {}
