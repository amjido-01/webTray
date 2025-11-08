import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";

export function useAuthHydration() {
  const [hydrated, setHydrated] = useState(false);
  const initialized = useAuthStore((state) => state._hasHydrated);

  useEffect(() => {
    if (initialized) {
      setHydrated(true);
    }
  }, [initialized]);

  return hydrated;
}