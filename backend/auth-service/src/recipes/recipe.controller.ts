import { Controller, Get, Headers, UseGuards } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guards';

@Controller('recipes')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getRecipes(@Headers('authorization') authHeader: string) {
    const token = authHeader?.replace('Bearer ', '');
    return this.recipeService.getRecipes(token);
  }
}