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
import { JwtAuthGuard } from 'src/guards/jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
  async add(@Req() req: any, @Body() body: any) {
    const { id, title, image, imageType } = body;

    const recipe = {
      recipeId: id, // <-- aquí lo renombras
      title,
      image,
      imageType,
    };

    return this.favoritesService.addFavorite(req.user.userId, recipe);
  }

  @Delete(':recipeId')
  async remove(@Req() req: any, @Param('recipeId') recipeId: number) {
    return this.favoritesService.removeFavorite(
      req.user.userId,
      Number(recipeId),
    );
  }

  @Get()
  async getAll(@Req() req: any) {
    return this.favoritesService.getFavorites(req.user.userId);
  }
}