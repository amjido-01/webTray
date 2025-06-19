import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import api from "@/lib/axios";
import { AxiosError } from "axios";
import {
  User,
  RegisterPayload,
  ResetPasswordPayload,
  VerifyOtpPayload,
  LoginPayload,
} from "@/types";



interface AuthState  {
  user: User | null;
  accessToken: string | null;
  refreshTokenValue: string | null;
  loading: boolean;
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
  isLoggedIn: () => boolean;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<string>;
  verifyOtp: (payload: VerifyOtpPayload) => Promise<void>;
  resendOtp: (email: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (payload: ResetPasswordPayload) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<boolean>;
  refreshToken: () => Promise<void>;
}


export const useAuthStore = create(
  persist<AuthState>(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshTokenValue: null,
      loading: false,
      _hasHydrated: false,

      setHasHydrated: (state: boolean) => {
        set({ _hasHydrated: state });
      },

      isLoggedIn: () => {
        const state = get();
        const hasToken = !!state.accessToken;
        console.log("🔍 isLoggedIn check:", hasToken);
        return hasToken;
      },

      register: async (payload: RegisterPayload) => {
        try {
          const response = await api.post("/auth/register", payload);
          const { responseSuccessful, responseMessage } = response.data;

          if (!responseSuccessful) {
            throw new Error(responseMessage || "Registration failed");
          }

          return payload.email;
        } catch (err) {
          const error = err as AxiosError<{ responseMessage: string }>;
          const customMessage =
            error.response?.data?.responseMessage || "Registration failed";
          throw new Error(customMessage);
        }
      },

      verifyOtp: async (payload) => {
        try {
          const response = await api.post("/auth/verify", payload);
          const { responseSuccessful, responseBody, responseMessage } =
            response.data;

          if (!responseSuccessful) {
            throw new Error(responseMessage || "OTP verification failed");
          }

          const { user, accessToken, refreshToken } = responseBody;

          console.log("✅ OTP verified, tokens received");
          set({ user, accessToken, refreshToken });
        } catch (err) {
          const error = err as AxiosError<{ responseMessage: string }>;
          const customMessage =
            error.response?.data?.responseMessage || "OTP verification failed";
          throw new Error(customMessage);
        }
      },

      resendOtp: async (email: string) => {
        set({ loading: true });
        try {
          const response = await api.post("/api/v1/auth/resend", { email });
          const { responseSuccessful, responseMessage } = response.data;

          if (!responseSuccessful) {
            throw new Error(responseMessage || "OTP resend failed");
          }
        } catch (error) {
          throw error;
        } finally {
          set({ loading: false });
        }
      },

      login: async (payload: LoginPayload) => {
        set({ loading: true });
        try {
          console.log("🔄 Logging in...");
          const response = await api.post("/auth/login", payload, {withCredentials:  true});
          const { responseBody } = response.data;
          const accessToken = responseBody.accessToken;
          const refreshToken = responseBody.refreshToken;

          console.log("✅ Login successful, tokens received");
          console.log("🔍 Access token:", accessToken ? "Present" : "Missing");

          set({
            accessToken,
            refreshToken,
            user: responseBody.user,
          });

          console.log("✅ Auth store updated");
        } catch (error) {
          console.error("❌ Login failed:", error);
          throw error;
        } finally {
          set({ loading: false });
        }
      },

      forgotPassword: async (email: string) => {
        set({ loading: true });
        try {
          const response = await api.post("/auth/forgot", { email });
          const { responseSuccessful, responseMessage } = response.data;

          if (!responseSuccessful) {
            throw new Error(responseMessage || "Failed to send reset email");
          }

          return responseMessage;
        } catch (err) {
          const error = err as AxiosError<{ responseMessage: string }>;
          const customMessage = error?.response?.data?.responseMessage;
          throw new Error(customMessage);
        } finally {
          set({ loading: false });
        }
      },

      resetPassword: async (payload: ResetPasswordPayload) => {
        set({ loading: true });
        try {
          const response = await api.post("/auth/reset", payload);
          const { responseSuccessful, responseMessage } = response.data;

          if (!responseSuccessful) {
            throw new Error(responseMessage || "Failed to reset password");
          }

          return responseMessage || "Password reset successfully";
        } catch (err) {
          const error = err as AxiosError<{ responseMessage: string }>;
          const customMessage =
            error.response?.data?.responseMessage || "Failed to reset password";
          throw new Error(customMessage);
        } finally {
          set({ loading: false });
        }
      },

      checkAuth: async () => {
        const accessToken = get().accessToken;

        if (!accessToken) {
          console.warn(" Access token not found. User not logged in.");
          set({ user: null, loading: false });
          return false;
        }

        try {
          const response = await api.get("/profile");
          const { responseBody } = response.data;
          set({ user: responseBody });
          console.log("✅ Auth check successful");
          return true;
        } catch (error) {
          console.error("❌ Error fetching user data:", error);
          set({ user: null, loading: false });
          return false;
        }
      },

      refreshToken: async () => {
        try {
          console.log("🔄 Refreshing token...");
          const response = await api.post("/auth/refresh");
          const { accessToken } = response.data;

          console.log("✅ Token refreshed successfully");
          set({ accessToken });
        } catch (error) {
          console.error("❌ Error refreshing token:", error);
          set({ user: null, accessToken: null, refreshTokenValue: null });
          throw error;
        }
      },

      logout: async () => {
        try {
          await api.post("/auth/logout");
        } catch (error) {
          console.warn("Logout failed, but clearing user data anyway:", error);
        }

        console.log("🔄 Logging out...");
        set({ user: null, accessToken: null, refreshTokenValue: null });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshTokenValue: state.refreshTokenValue,
      }),

      onRehydrateStorage: () => (state) => {
        console.log("🔄 Store hydrated");
        if (state) {
          state.setHasHydrated(true);
          console.log("🔍 Hydrated state:", {
            hasUser: !!state.user,
            hasAccessToken: !!state.accessToken,
            hasRefreshToken: !!state.refreshTokenValue,
          });
        }
      },
    }
  )
);
