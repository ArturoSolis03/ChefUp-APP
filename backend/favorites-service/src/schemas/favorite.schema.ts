import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Favorite extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  recipeId: number;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  image: string;

  @Prop()
  imageType?: string;
}

export const FavoriteSchema = SchemaFactory.createForClass(Favorite);