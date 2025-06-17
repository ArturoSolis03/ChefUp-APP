import {jwtDecode} from 'jwt-decode';
import api from './api';
import { User } from './User';

interface JWTPayload {
  exp: number;
  [key: string]: any;
}

export const getUserFromStorage = (): User | null => {
  const stored = localStorage.getItem('user');
  if (!stored) return null;
  return new User(JSON.parse(stored));
};

export const saveUserToStorage = (user: User) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const clearUser = () => {
  localStorage.removeItem('user');
};

export const isTokenValid = (token: string): boolean => {
  try {
    const decoded = jwtDecode<JWTPayload>(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  } catch {
    return false;
  }
};

export const isAuthenticated = (): boolean => {
  const user = getUserFromStorage();
  if (!user) return false;
  return isTokenValid(user.accessToken);
};

export const refreshToken = async (): Promise<string | null> => {
  const user = getUserFromStorage();
  const refresh = user?.refreshToken;

  if (!refresh || !isTokenValid(refresh)) {
    clearUser();
    return null;
  }

  try {
    const response = await api.post('/auth/refresh', null, {
      headers: {
        Authorization: `Bearer ${refresh}`, // ✅ Aquí usamos el refreshToken en el header
      },
    });

    const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data;

    const updatedUser = new User({
      ...user,
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });

    saveUserToStorage(updatedUser);
    return newAccessToken;
  } catch (error) {
    console.error('Error trying refresh token:', error);
    clearUser();
    return null;
  }
};

export const login = async (email: string, password: string) => {
  const response = await api.post('/auth/login', { email, password });
  const user = new User(response.data);
  saveUserToStorage(user);
  return user;
};

export const logout = () => {
  clearUser();
  window.location.href = '/auth/login';
};

export const register = async (userDto: User): Promise<User> => {
  const response = await api.post('/auth/register', {
    ...userDto
  });

  const user = new User(response.data);
  saveUserToStorage(user);
  return user;
};