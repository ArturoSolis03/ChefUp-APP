import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';

export interface Favorite {
  userId: string;
  recipeId: number;
  title: string;
  image: string;
  imageType?: string;
}

export interface FavoriteDocument extends Favorite, Document {}

@Injectable()
export class FavoritesService {
  constructor(
    @InjectModel('Favorite')
    private readonly favoriteModel: Model<FavoriteDocument>,
  ) {}

  async addFavorite(userId: string, recipe: Omit<Favorite, 'userId'>) {
    const exists = await this.favoriteModel.findOne({
      userId,
      recipeId: recipe.recipeId,
    });

    if (exists) return exists;

    return this.favoriteModel.create({ userId, ...recipe });
  }

  async removeFavorite(userId: string, recipeId: number) {
    return this.favoriteModel.deleteOne({ userId, recipeId });
  }

  async getFavorites(userId: string) {
    return this.favoriteModel.find({ userId });
  }
}