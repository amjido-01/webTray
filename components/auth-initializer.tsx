"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import Cookies from "js-cookie";

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
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent"></div>
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}