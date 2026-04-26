import { AuthHydrationGate } from "@/components/auth-hydration-gate";
import { AuthInitializer } from "@/components/auth-initializer";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthHydrationGate>
      <AuthInitializer>{children}</AuthInitializer>
    </AuthHydrationGate>
  );
}
