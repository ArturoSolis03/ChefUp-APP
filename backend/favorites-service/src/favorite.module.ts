import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FavoritesController } from './controllers/favorite-controller';
import { FavoritesService } from './services/favorite.service';
import { FavoriteSchema } from './schemas/favorite.schema';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './guards/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.ACCESS_TOKEN_SECRET,
      signOptions: { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION || '1h' },
    }),
    MongooseModule.forFeature([{ name: 'Favorite', schema: FavoriteSchema }]),
  ],
  providers: [FavoritesService, JwtStrategy],
  controllers: [FavoritesController],
})
export class FavoritesModule {}