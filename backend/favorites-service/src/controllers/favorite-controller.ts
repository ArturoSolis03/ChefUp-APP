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
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { Query } from '@nestjs/common';

@Controller('favorites')
@UseGuards(AuthGuard('jwt'))
@ApiTags('Favorites')
@ApiBearerAuth()
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
  @ApiOperation({ summary: 'Add a recipe to favorites' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        title: { type: 'string' },
        image: { type: 'string' },
        imageType: { type: 'string' },
      },
      required: ['id', 'title', 'image', 'imageType'],
    },
  })
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
  @ApiOperation({ summary: 'Remove a recipe from favorites' })
  @ApiParam({ name: 'recipeId', type: Number })
  async remove(@Req() req: Request, @Param('recipeId') recipeId: number) {
    const user = req.user as any;
    return this.favoritesService.removeFavorite(user.sub, Number(recipeId));
  }

  @Get()
  @ApiOperation({ summary: 'Get all favorite recipes (paginated)' })
  async getAll(
    @Req() req: Request,
    @Query('page') page = '1',
    @Query('limit') limit = '8',
  ) {
    const user = req.user as any;
    const pageNumber = parseInt(page, 10) || 1;
    const limitNumber = parseInt(limit, 10) || 8;

    return this.favoritesService.getFavorites(
      user.sub,
      pageNumber,
      limitNumber,
    );
  }
}
