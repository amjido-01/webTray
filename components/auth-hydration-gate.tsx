"use client";

import { ReactNode, useEffect, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useAuthHydration } from "@/hooks/use-auth-hydration";
import { LoadingScreen } from "./ui/loading-screen";

export function AuthHydrationGate({ children }: { children: ReactNode }) {
  const hydrated = useAuthHydration();
  const [initialHydration, setInitialHydration] = useState(true);
  const { user, loading } = useAuthStore();

  useEffect(() => {
    // Only set hydration complete when both hydrated and user state is ready
    if (hydrated && !loading && (user || user === null)) {
      setInitialHydration(false);
    }
  }, [hydrated, user, loading]);

  // Show loading during initial hydration or while auth state is loading
  if (!hydrated || (initialHydration && loading)) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
}