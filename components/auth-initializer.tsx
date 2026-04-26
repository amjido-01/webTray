"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import Cookies from "js-cookie";
import { LoadingScreen } from "./ui/loading-screen";

export function AuthInitializer({ children }: { children: React.ReactNode }) {
  const { checkAuth, _hasHydrated, isLoggedIn } = useAuthStore();
   const [isInitializing, setIsInitializing] = useState(true);
   
  useEffect(() => {
    const initAuth = async () => {
      // Wait for Zustand hydration
      if (!_hasHydrated) return;

      // Check if we have a token
      const hasSession = isLoggedIn();

      if (hasSession) {
        try {
          // Fetch fresh user data
          await checkAuth();
        } catch (error) {
          console.error("Auth check failed:", error);
          // Cookies will be cleared by axios interceptor or middleware
        }
      }
      setIsInitializing(false);
    };

    initAuth();
  }, [_hasHydrated, checkAuth, isLoggedIn]);

   // Show loading only during initial load
  if (isInitializing) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
}