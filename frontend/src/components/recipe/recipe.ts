export interface Recipe {
  id: number;         // Unique identifier for the recipe
  title: string;       // Name of the recipe
  image: string;      // URL to an image of the recipe
  imageType: string;
  ingredients?:  Ingredient[];
  instructions?: string;
}

export interface RecipesData {
    page:         number;
    totalPages:   number;
    totalResults: number;
    results:      Recipe[];
}

export interface Ingredient {
    name:   string;
    amount: number;
    unit:   string;
}