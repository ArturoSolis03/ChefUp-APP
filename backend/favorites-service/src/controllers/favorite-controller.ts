import {
  Controller,
  Post,
  Delete,
  Get,
  Body,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FavoritesService } from 'src/services/favorite.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('favorites')
@UseGuards(AuthGuard('jwt')) // ← protege todo el controller
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
  async add(@Req() req: Request, @Body() body: any) {
    const user = req.user as any;

    const { id, title, image, imageType } = body;

    const recipe = {
      recipeId: id,
      title,
      image,
      imageType,
    };

    return this.favoritesService.addFavorite(user.sub, recipe);
  }

  @Delete(':recipeId')
  async remove(@Req() req: Request, @Param('recipeId') recipeId: number) {
    const user = req.user as any;
    return this.favoritesService.removeFavorite(user.sub, Number(recipeId));
  }

  @Get()
  async getAll(@Req() req: Request) {
    const user = req.user as any;
    return this.favoritesService.getFavorites(user.sub);
  }
}