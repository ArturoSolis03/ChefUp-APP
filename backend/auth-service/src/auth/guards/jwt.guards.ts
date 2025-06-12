import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

//injectable 
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
