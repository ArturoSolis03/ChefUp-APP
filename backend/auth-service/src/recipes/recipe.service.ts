import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class RecipeService {
  private readonly apiUrl = 'https://api.spoonacular.com/recipes/complexSearch';
  private readonly apiKey = process.env.SPOONACULAR_API_KEY;
  private readonly recipesPerPage = 8;
  private readonly maxPages = 4;

  private readonly favoritesServiceUrl = 'http://3.91.55.17:3001';

  private async getUserFavoriteIds(userToken: string): Promise<number[]> {
    try {
      const response = await axios.get(
        `${this.favoritesServiceUrl}/favorites/ids`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error('Error consultando favoritos:', error.message);
      return [];
    }
  }

  async getRecipes(userToken: string, page = 1, search = ''): Promise<any> {
    if (!userToken) throw new UnauthorizedException('Missing token');
    if (page < 1 || page > this.maxPages) {
      throw new BadRequestException(
        `Page must be between 1 and ${this.maxPages}`,
      );
    }

    const offset = (page - 1) * this.recipesPerPage;

    const response = await axios.get(this.apiUrl, {
      params: {
        apiKey: this.apiKey,
        number: this.recipesPerPage,
        offset,
        query: search,
      },
    });

    const recipes = response.data.results;

    const favoriteIdsSet = new Set(await this.getUserFavoriteIds(userToken));

    const results = recipes.map((recipe) => ({
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,
      imageType: recipe.imageType,
      isFavorite: favoriteIdsSet.has(recipe.id),
    }));

    return {
      page,
      totalPages: this.maxPages,
      totalResults: response.data.totalResults,
      results,
    };
  }

  async getRecipeById(id: string, userToken: string): Promise<any> {
    if (!userToken) throw new UnauthorizedException('Missing token');

    const url = `https://api.spoonacular.com/recipes/${id}/information`;

    const response = await axios.get(url, {
      params: {
        apiKey: this.apiKey,
      },
    });

    return {
      id: response.data.id,
      title: response.data.title,
      image: response.data.image,
      summary: response.data.summary,
      readyInMinutes: response.data.readyInMinutes,
      servings: response.data.servings,
      sourceUrl: response.data.sourceUrl,
    };
  }

  async getRecipeDetails(id: string, userToken: string): Promise<any> {
    if (!userToken) throw new UnauthorizedException('Missing token');

    const url = `https://api.spoonacular.com/recipes/${id}/information`;

    const response = await axios.get(url, {
      params: {
        apiKey: this.apiKey,
        includeNutrition: false,
      },
    });

    const data = response.data;

    const favoriteIds = await this.getUserFavoriteIds(userToken);
    const isFavorite = favoriteIds.includes(data.id);

    return {
      id: data.id,
      title: data.title,
      image: data.image,
      ingredients: data.extendedIngredients?.map((i) => ({
        name: i.name,
        amount: i.amount,
        unit: i.unit,
      })),
      instructions: data.instructions,
      isFavorite,
    };
  }
}
