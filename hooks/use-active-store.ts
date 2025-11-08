// hooks/use-active-store.ts

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";

/**
 * Hook to safely access active store
 * Ensures store data is loaded before returning
 */
export function useActiveStore() {
  const { activeStore, stores, user, _hasHydrated, checkAuth } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStores = async () => {
      // Wait for hydration
      if (!_hasHydrated) return;

      // If we have a user but no stores, fetch them
      if (user && stores.length === 0) {
        try {
          await checkAuth();
        } catch (error) {
          console.error("Failed to load stores:", error);
        }
      }

      setIsLoading(false);
    };

    loadStores();
  }, [_hasHydrated, user, stores.length, checkAuth]);

  return {
    activeStore,
    stores,
    isLoading: isLoading || !_hasHydrated,
    hasStores: stores.length > 0,
  };
}

/**
 * Hook that ensures active store exists
 * Shows loading state until store is available
 */
export function useRequireActiveStore() {
  const { activeStore, isLoading } = useActiveStore();

  return {
    activeStore: activeStore!,
    isLoading,
    hasActiveStore: !!activeStore,
  };
}