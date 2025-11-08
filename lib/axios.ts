import axios from "axios";
import { BASE_URL } from "@/constants/api";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Request interceptor - attach access token
api.interceptors.request.use(
  (config) => {
    console.log("Attaching access token to request");
    const accessToken = Cookies.get("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 and haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = Cookies.get("refreshToken");
      
      if (!refreshToken) {
        // No refresh token - logout
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        window.location.href = "/signin";
        return Promise.reject(error);
      }

      try {
        // I have to talk to the backend guy to make sure this endpoint is correct
        // Call refresh endpoint with refresh token 
        const response = await axios.post(
          `${BASE_URL}/auth/refresh`,
          { refreshToken },
          { withCredentials: true }
        );
        console.log("Refresh response:", response.data);

        const { accessToken } = response.data;

        console.log("New access token:", accessToken);

        // Update cookie
        const isProduction = process.env.NODE_ENV === "production";
        Cookies.set("accessToken", accessToken, {
          expires: 1,
          secure: isProduction,
          sameSite: isProduction ? "None" : "Lax",
        });

        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
        
      } catch (refreshError) {
        // Refresh failed - logout
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        window.location.href = "/signin";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;