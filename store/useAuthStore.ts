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

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshTokenValue: string | null;

  loading: boolean;
  _hasHydrated: boolean;

  setHasHydrated: (state: boolean) => void;

  isLoggedIn: () => boolean;
  isBusinessRegistered: () => boolean;

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

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshTokenValue: null,
      loading: false,
      _hasHydrated: false,

      setHasHydrated: (state) => {
        set({ _hasHydrated: state });
      },

      isLoggedIn: () => {
        const state = get();
        return !!state.accessToken;
      },

      isBusinessRegistered: () => {
        const state = get();
        return state.user?.business != null;
      },

      register: async (payload) => {
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

          set({ user, accessToken, refreshToken });
        } catch (err) {
          const error = err as AxiosError<{ responseMessage: string }>;
          const customMessage =
            error.response?.data?.responseMessage || "OTP verification failed";
          throw new Error(customMessage);
        }
      },

      resendOtp: async (email) => {
        set({ loading: true });
        try {
          const response = await api.post("/auth/resend", { email });
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

      login: async (payload) => {
        set({ loading: true });
        try {
          const response = await api.post("/auth/login", payload);
          const { responseBody } = response.data;

          // Store the basic user and tokens
          set({
            accessToken: responseBody.accessToken,
            refreshTokenValue: responseBody.refreshToken,
            user: responseBody.user,
          });

          // ✅ Now fetch the full user, business, and store
          const profileResponse = await api.get("/user/profile");
          const { user, business, store } = profileResponse.data.responseBody;

          set({
            user: {
              ...user,
              business,
              store,
            },
          });
        } catch (error) {
          console.error("Login failed:", error);
          throw error;
        } finally {
          set({ loading: false });
        }
      },

      forgotPassword: async (email) => {
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

      resetPassword: async (payload) => {
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
          set({ user: null, loading: false });
          return false;
        }

        try {
          const response = await api.get("/user/profile");
          const { user } = response.data.responseBody;

          set({ user }); // user now contains any business
          return true;
        } catch (error) {
          console.error("Error fetching user data:", error);
          set({ user: null, loading: false });
          return false;
        }
      },

      refreshToken: async () => {
        try {
          const response = await api.post("/auth/refresh");
          const { accessToken } = response.data;
          console.log(accessToken)
          set({ accessToken });
        } catch (error) {
          console.error("Error refreshing token:", error);
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
        if (state) {
          state.setHasHydrated(true);
        }
      },
    }
  )
);
