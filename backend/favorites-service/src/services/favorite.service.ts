import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
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

    if (exists) {
      throw new ConflictException('Recipe already in favorites');
    }

    const created = await this.favoriteModel.create({ userId, ...recipe });

    await this.sqsService.sendMessage({
      event: 'favorite_added',
      userId,
      recipeId: recipe.recipeId,
      title: recipe.title,
    });

    return {
      id: created.recipeId,
      title: created.title,
      image: created.image,
      imageType: created.imageType,
    };
  }

  async removeFavorite(userId: string, recipeId: number) {
    const result = await this.favoriteModel.deleteOne({ userId, recipeId });

    if (result.deletedCount === 0) {
      throw new NotFoundException('Recipe not found in favorites');
    }

    await this.sqsService.sendMessage({
      event: 'favorite_removed',
      userId,
      recipeId,
    });

    return { success: true };
  }

  async getFavorites(userId: string, page = 1, limit = 8) {
    const skip = (page - 1) * limit;

    const favorites = await this.favoriteModel
      .find({ userId })
      .skip(skip)
      .limit(limit)
      .exec();

    const total = await this.favoriteModel.countDocuments({ userId });

    return {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      data: favorites.map((fav) => ({
        id: fav.recipeId,
        title: fav.title,
        image: fav.image,
        imageType: fav.imageType,
      })),
    };
  }
}
