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
// {"state":{"user":{"id":2,"email":"amastudioagency@gmail.com","phone":"08086259124","fullname":"ala","status":null,"password":"$2b$10$PGRGBOaq7JxmHfSRlm0qCOawCX0UnD93gFBeT/HIBPjZisjlXDVGe","refreshToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJhbWFzdHVkaW9hZ2VuY3lAZ21haWwuY29tIiwiaWF0IjoxNzUwNDI0NjIzLCJleHAiOjE3NTEwMjk0MjN9.OLIx5khu9SZrJsmYE7ZBHtbcaDdtqGPpdWYF0qIHCEM","createdAt":"2025-06-18T12:36:00.103Z","updatedAt":"2025-06-20T13:03:44.005Z"},"accessToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJhbWFzdHVkaW9hZ2VuY3lAZ21haWwuY29tIiwiaWF0IjoxNzUwNDI4NzkxLCJleHAiOjE3NTA0MzIzOTF9.8uCAsfagPh7zr-97xqwRm_zG4Q3kekZ35pkbR7JK61I","refreshTokenValue":null,"hasBusiness":true},"version":0}
interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshTokenValue: string | null;
  hasBusiness: boolean;
  loading: boolean;
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
  setHasBusiness: (state: boolean) => void;
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

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      hasBusiness: false,
      accessToken: null,
      refreshTokenValue: null,
      loading: false,
      _hasHydrated: false,

      setHasHydrated: (state: boolean) => {
        set({ _hasHydrated: state });
      },
       setHasBusiness: (state) => {
        set({ hasBusiness: state });
      },
      isLoggedIn: () => {
        const state = get();
        const hasToken = !!state.accessToken;
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

          set({ user, accessToken, refreshToken, hasBusiness: Boolean(user?.businessId)});
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
          const response = await api.post("/auth/login", payload, {
            withCredentials: true,
          });
          const { responseBody } = response.data;
          const accessToken = responseBody.accessToken;
          const refreshToken = responseBody.refreshToken;
          set({
            accessToken,
            refreshToken,
            user: responseBody.user,
             hasBusiness: Boolean(responseBody?.user?.businessId),
          });
        } catch (error) {
          console.error("Login failed:", error);
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
          set({ user: null, loading: false });
          return false;
        }

        try {
          const response = await api.get("/user/profile");
          const { user, business } = response.data.responseBody;
          set({
            user,
            hasBusiness: business !== null,
          });
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
        hasBusiness: state.hasBusiness,
      }),

      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHasHydrated(true);
        }
      },
    }
  )
);
