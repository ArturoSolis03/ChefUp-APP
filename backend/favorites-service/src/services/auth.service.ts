import { HttpService } from '@nestjs/axios';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(private readonly httpService: HttpService) {}

  async validateToken(authHeader: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(
          'http://localhost:3000/auth/validate',
          {},
          {
            headers: { Authorization: authHeader },
          },
        ),
      );
      return response.data;
    } catch (error) {
      throw new UnauthorizedException('Invalid Token');
    }
  }
}
