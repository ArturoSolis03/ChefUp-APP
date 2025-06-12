import { Injectable, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class RecipeService {
  private readonly apiUrl = 'https://api.spoonacular.com/recipes/complexSearch';
  private readonly apiKey = process.env.SPOONACULAR_API_KEY;

  async getRecipes(userToken: string): Promise<any[]> {
    if (!userToken) throw new UnauthorizedException('Missing token');

    const response = await axios.get(this.apiUrl, {
      params: {
        apiKey: this.apiKey,
        number: 10,
      },
    });

    return response.data.results.map(recipe => ({
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,
      imageType: recipe.imageType,
    }));
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
}