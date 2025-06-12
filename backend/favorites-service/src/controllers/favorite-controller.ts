import {
  Controller,
  Post,
  Delete,
  Get,
  Body,
  Param,
  Req,
  Headers,
} from '@nestjs/common';
import { FavoritesService } from 'src/services/favorite.service';
import { AuthService } from 'src/services/auth.service';
import { Request } from 'express';

@Controller('favorites')
export class FavoritesController {
  constructor(
    private readonly favoritesService: FavoritesService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  async add(@Headers('authorization') authHeader: string, @Body() body: any) {
    const user = await this.authService.validateToken(authHeader);

    const { id, title, image, imageType } = body;

    const recipe = {
      recipeId: id,
      title,
      image,
      imageType,
    };

    return this.favoritesService.addFavorite(user.id, recipe);
  }

  @Delete(':recipeId')
  async remove(
    @Headers('authorization') authHeader: string,
    @Param('recipeId') recipeId: number,
  ) {
    const user = await this.authService.validateToken(authHeader);
    return this.favoritesService.removeFavorite(user.id, Number(recipeId));
  }

  @Get()
  async getAll(@Headers('authorization') authHeader: string) {
    const user = await this.authService.validateToken(authHeader);
    return this.favoritesService.getFavorites(user.id);
  }
}