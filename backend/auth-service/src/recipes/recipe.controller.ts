import {
  Controller,
  Get,
  Headers,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guards';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiQuery,
} from '@nestjs/swagger';

@ApiTags('Recipes')
@ApiBearerAuth()
@Controller('recipes')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get a paginated list of recipes from Spoonacular' })
  @ApiQuery({ name: 'page', required: false, description: 'Page number (1 to 4)', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'List of recipes returned successfully',
  })
  getRecipes(
    @Headers('authorization') authHeader: string,
    @Query('page') page = '1',
  ) {
    const token = authHeader?.replace('Bearer ', '');
    return this.recipeService.getRecipes(token, Number(page));
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