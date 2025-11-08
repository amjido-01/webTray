import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import ReactQueryProvider from "@/lib/react-query-provider";
import { AuthHydrationGate } from "@/components/auth-hydration-gate";
import { AuthInitializer } from "@/components/auth-initializer";

const lato = Lato({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Webtray | Smart Inventory Management Software",
  description:
    "Webtray.ng is an all-in-one inventory management software that helps restaurants, retailers, and vendors manage stock, track sales, monitor performance, and grow their businesses. Simplify operations, save time, and scale effortlessly with Webtray.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
     <html lang="en">
      <body className={lato.className}>
        <ReactQueryProvider>
          <AuthHydrationGate>
            <AuthInitializer>
            <main>{children}</main>
            </AuthInitializer>
          </AuthHydrationGate>
        </ReactQueryProvider>

        <Toaster />
      </body>
    </html>
  );
}
