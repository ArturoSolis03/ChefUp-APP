import { Controller, Get, Headers, Param, UseGuards } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guards';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';

@ApiTags('Recipes')
@ApiBearerAuth()
@Controller('recipes')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get a list of recipes from Spoonacular' })
  @ApiResponse({
    status: 200,
    description: 'List of recipes returned successfully',
  })
  getRecipes(@Headers('authorization') authHeader: string) {
    const token = authHeader?.replace('Bearer ', '');
    return this.recipeService.getRecipes(token);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get detailed information of a specific recipe' })
  @ApiParam({ name: 'id', type: 'string', description: 'Recipe ID' })
  @ApiResponse({
    status: 200,
    description: 'Recipe details returned successfully',
  })
  getRecipeDetails(
    @Param('id') id: string,
    @Headers('authorization') authHeader: string,
  ) {
    const token = authHeader?.replace('Bearer ', '');
    return this.recipeService.getRecipeDetails(id, token);
  }
}