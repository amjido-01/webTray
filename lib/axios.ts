import axios from 'axios';
import { useAuthStore } from "@/store/useAuthStore";
import { BASE_URL } from '@/constants/api';

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// REQUEST INTERCEPTOR - This was missing!
api.interceptors.request.use(
  (config) => {
    const { accessToken } = useAuthStore.getState();
    
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    } else {
      console.log('No token available');
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// RESPONSE INTERCEPTOR - Enhanced with better debugging
api.interceptors.response.use(
  (response) => {
    console.log('✅ Response successful:', response.config.url);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const authStore = useAuthStore.getState();
      
      if (authStore.isLoggedIn()) {
        try {
          await authStore.refreshToken();
          return api(originalRequest);
        } catch (refreshError) {
          await authStore.logout();
          throw refreshError;
        }
      } else {
        console.log('❌ User not logged in, cannot refresh');
        throw error;
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;