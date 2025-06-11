import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import api from "@/lib/axios";

interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  frequency: string;
  createdAt: string;
  updatedAt: string;
}

interface RegisterPayload {
  fullname: string;
  phone: string;
  email: string;
  password: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  loading: boolean;
  isLoggedIn: () => boolean;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<boolean>;
  refreshToken: () => Promise<void>;
}


export const useAuthStore = create(
  persist<AuthState>(
    (set, get) => ({
      user: null,
      accessToken: null,
      loading: false,

      isLoggedIn: () => {
        return !!get().accessToken;
      },

      register: async (payload: RegisterPayload) => {
        try {
          const response = await api.post("/api/v1/auth/register", payload);
          const { user, accessToken } =
            response.data.responseBody;
          set({ user, accessToken });
          api.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${accessToken}`;

          // Note: We don't set tokens here as they're typically not provided upon registration
        } catch (error) {
          console.error("Registration failed:", error);
          throw error;
        }
      },

      login: async (payload: LoginPayload) => {
        set({ loading: true });
        try {
          const response = await api.post("/api/v1/auth/login", payload);
          const { accessToken, responseBody } = response.data;

          set({ accessToken, user: responseBody.user });
          api.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${accessToken}`;
        } catch (error) {
          console.error("Login failed:", error);
          throw error;
        } finally {
          set({ loading: false });
        }
      },

      checkAuth: async () => {
        const accessToken = get().accessToken;

        // If there's no access token, assume the user is not logged in
        if (!accessToken) {
          console.warn("Access token not found. User not logged in.");
          set({ user: null, loading: false });
          return false;
        }
        try {
          const response = await api.get("/profile");
          const { user } = response.data;
          set({ user });
          return true;
        } catch (error) {
          console.error("Error fetching user data:", error);
          set({ user: null, loading: false });
          return false;
        }
      },

      // generate refresh token
      refreshToken: async () => {
        try {
          const response = await api.post("/refresh-token");
          const { accessToken } = response.data;
          console.log(accessToken, "refreshtoken");

          set({ accessToken });
          api.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${accessToken}`;
        } catch (error) {
          console.error("Error refreshing token:", error);
          set({ user: null, accessToken: null });
        }
      },

      // login function
      logout: async () => {
        try {
          await api.post("/auth/logout");
        } catch (error) {
          console.warn("Logout failed, but clearing user data anyway:", error);
        }
        set({ user: null, accessToken: null });
        delete api.defaults.headers.common["Authorization"];
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
