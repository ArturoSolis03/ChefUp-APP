import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';
import { SqsService } from './sqs.service';

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
    private readonly sqsService: SqsService,
  ) {}

  async addFavorite(userId: string, recipe: Omit<Favorite, 'userId'>) {
    const exists = await this.favoriteModel.findOne({
      userId,
      recipeId: recipe.recipeId,
    });

    if (exists) return exists;

    const created = await this.favoriteModel.create({ userId, ...recipe });

    await this.sqsService.sendMessage({
      event: 'favorite_added',
      userId,
      recipeId: recipe.recipeId,
      title: recipe.title,
    });

    return created;
  }

  async removeFavorite(userId: string, recipeId: number) {
    const deleted = await this.favoriteModel.deleteOne({ userId, recipeId });

    await this.sqsService.sendMessage({
      event: 'favorite_removed',
      userId,
      recipeId,
    });

    return deleted;
  }

  async getFavorites(userId: string) {
    return this.favoriteModel.find({ userId });
  }
}