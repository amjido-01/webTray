"use client";

import { ReactNode, useEffect, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useAuthHydration } from "@/hooks/use-auth-hydration";

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
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent"></div>
          <p className="text-sm text-muted-foreground">
            {loading ? "Loading..." : "Initializing..."}
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}