import axios from 'axios';
import {
  getUserFromStorage,
  saveUserToStorage,
  clearUser,
  isTokenValid,
} from './auth';
import { User } from './User';

const api = axios.create({
  baseURL: 'https://tudominio.com/api'
});

api.interceptors.request.use(async (config) => {
  const user = getUserFromStorage();

  if (!user) {
    return config;
  }

  let { accessToken, refreshToken } = user;

  // Si el accessToken ha expirado
  if (!isTokenValid(accessToken) && isTokenValid(refreshToken)) {
    try {
      const response = await api.get('/auth/refresh',
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        }
      );

      accessToken = response.data.accessToken;
      refreshToken = response.data.refreshToken;

      const updatedUser = new User({
        ...user,
        accessToken,
        refreshToken,
      });

      saveUserToStorage(updatedUser);
    } catch (error) {
      clearUser();
      throw error;
    }
  }

  // Si hay token válido, añadirlo al header
  if (isTokenValid(accessToken) && config.headers) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

export default api;
