import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FavoritesController } from './controllers/favorite-controller';
import { FavoritesService } from './services/favorite.service';
import { FavoriteSchema } from './schemas/favorite.schema';
import { AuthService } from './services/auth.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: 'Favorite', schema: FavoriteSchema }]),
  ],
  providers: [FavoritesService, AuthService],
  controllers: [FavoritesController],
})
export class FavoritesModule {}
