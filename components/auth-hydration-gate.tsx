"use client";

import { ReactNode } from "react";
import { useAuthHydration } from "@/hooks/use-auth-hydration";


export function AuthHydrationGate({ children }: { children: ReactNode }) {
  const hydrated = useAuthHydration();

  if (!hydrated) return; // or return null for silent wait

  return <>{children}</>;
}
