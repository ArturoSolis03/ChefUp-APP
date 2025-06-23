import axios from 'axios';
import {
  getAccessToken,
  getRefreshToken,
  saveTokens,
  clearTokens,
  isTokenValid,
} from '../auth/auth';

const IP = '18.212.212.159';

const api = (forFavorites: boolean = false) => {
  const baseURL = forFavorites
    ? `http://${IP}:3001`
    : `http://${IP}:3000`;

  const baseAPI = axios.create({ baseURL })
  baseAPI.interceptors.request.use(async (config) => {
    let accessToken = getAccessToken();
    let refreshToken = getRefreshToken();

    if (accessToken && !isTokenValid(accessToken) && refreshToken && isTokenValid(refreshToken)) {
      try {
        const response = await axios.post(
          `http://${IP}:3000/auth/refresh`,
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
  return baseAPI;
};

export const fetchRecipes = async (
  endpoint: 'recipes' | 'favorites',
  search: string,
  page: number
): Promise<any> => {
  const params = new URLSearchParams();
  if (search) params.append('search', search);
  params.append('page', page.toString());

  const response = await api(endpoint == 'favorites').get(`/${endpoint}?${params.toString()}`);
  
  return response.data;
};

export default api;
