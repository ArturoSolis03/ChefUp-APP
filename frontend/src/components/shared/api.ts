import axios from 'axios';
import {
  getAccessToken,
  getRefreshToken,
  saveTokens,
  clearTokens,
  isTokenValid,
} from '../auth/auth';
import { RecipesData } from '../recipe/recipe';

const api = axios.create({
  baseURL: 'http://34.230.89.28:3000'
});

api.interceptors.request.use(async (config) => {
  let accessToken = getAccessToken();
  let refreshToken = getRefreshToken();

  if (accessToken && !isTokenValid(accessToken) && refreshToken && isTokenValid(refreshToken)) {
    try {
      const response = await axios.post(
        'http://34.230.89.28:3000/auth/refresh',
        null,
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        }
      );

      saveTokens(response.data.accessToken, response.data.refreshToken);
    } catch (error) {
      clearTokens();
      window.location.href = '/login';
      throw error;
    }
  }

  if (accessToken && isTokenValid(accessToken) && config.headers) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

export const fetchRecipes = async (
  endpoint: 'recipes' | 'favorites',
  search: string,
  page: number,
  limit: number
): Promise<RecipesData> => {
  const params = new URLSearchParams();
  if (search) params.append('search', search);
  params.append('page', page.toString());
  params.append('limit', limit.toString());

  // const response = await api.get(`/${endpoint}?${params.toString()}`);
  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  await sleep(1000);
  const res: RecipesData = {
      "page": 1,
      "totalPages": 4,
      "totalResults": 5224,
      "results": [
          {
              "id": 715415,
              "title": "Red Lentil Soup with Chicken and Turnips",
              "image": "https://img.spoonacular.com/recipes/715415-312x231.jpg"
          },
          {
              "id": 716406,
              "title": "Asparagus and Pea Soup: Real Convenience Food",
              "image": "https://img.spoonacular.com/recipes/716406-312x231.jpg"
          },
          {
              "id": 644387,
              "title": "Garlicky Kale",
              "image": "https://img.spoonacular.com/recipes/644387-312x231.jpg"
          },
          {
              "id": 715446,
              "title": "Slow Cooker Beef Stew",
              "image": "https://img.spoonacular.com/recipes/715446-312x231.jpg"
          },
          {
              "id": 782601,
              "title": "Red Kidney Bean Jambalaya",
              "image": "https://img.spoonacular.com/recipes/782601-312x231.jpg"
          },
          {
              "id": 716426,
              "title": "Cauliflower, Brown Rice, and Vegetable Fried Rice",
              "image": "https://img.spoonacular.com/recipes/716426-312x231.jpg"
          },
          {
              "id": 716004,
              "title": "Quinoa and Chickpea Salad with Sun-Dried Tomatoes and Dried Cherries",
              "image": "https://img.spoonacular.com/recipes/716004-312x231.jpg"
          },
          {
              "id": 716627,
              "title": "Easy Homemade Rice and Beans",
              "image": "https://img.spoonacular.com/recipes/716627-312x231.jpg"
          }
      ]
  }
  return res;
};

export default api;
