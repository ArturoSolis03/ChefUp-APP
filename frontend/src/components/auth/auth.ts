import { jwtDecode } from 'jwt-decode';
import api from '../shared/api';

interface JWTPayload {
  exp: number;
  [key: string]: any;
}

// === Token Storage Utilities ===
const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

export const getAccessToken = (): string | null =>
  localStorage.getItem(ACCESS_TOKEN_KEY);

export const getRefreshToken = (): string | null =>
  localStorage.getItem(REFRESH_TOKEN_KEY);

export const saveTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
};

export const clearTokens = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

// === Token Validation ===
export const isTokenValid = (token: string): boolean => {
  try {
    const decoded = jwtDecode<JWTPayload>(token);
    return decoded.exp > Date.now() / 1000;
  } catch {
    return false;
  }
};

export const isAuthenticated = (): boolean => {
  const access = getAccessToken();
  return !!access && isTokenValid(access);
};

// === Token Refresh ===
export const refreshToken = async (): Promise<string | null> => {
  const refresh = getRefreshToken();
  if (!refresh || !isTokenValid(refresh)) {
    clearTokens();
    return null;
  }

  try {
    const response = await api.post('/auth/refresh', null, {
      headers: {
        Authorization: `Bearer ${refresh}`,
      },
    });

    const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data;
    saveTokens(newAccessToken, newRefreshToken);
    return newAccessToken;
  } catch (err) {
    console.error('Token refresh failed:', err);
    clearTokens();
    return null;
  }
};

// === Auth Actions ===
export const login = async (email: string, password: string): Promise<void> => {
  const response = await api.post('/auth/signin', { email, password });
  const { accessToken, refreshToken } = response.data;
  saveTokens(accessToken, refreshToken);
};

export const logout = () => {
  clearTokens();
};

export const register = async (userData: {
  email: string;
  password: string;
  [key: string]: any;
}): Promise<void> => {
  const response = await api.post('/auth/signup', userData);
  const { accessToken, refreshToken } = response.data;
  saveTokens(accessToken, refreshToken);
};
