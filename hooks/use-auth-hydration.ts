// hooks/useAuthHydration.ts
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect, useState } from "react";

export function useAuthHydration() {
  const hasHydrated = useAuthStore((state) => state._hasHydrated);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (hasHydrated) setHydrated(true);
  }, [hasHydrated]);

  return hydrated;
}
