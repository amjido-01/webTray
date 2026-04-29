import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import ReactQueryProvider from "@/lib/react-query-provider";


const lato = Lato({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://webtray.ng"),
  title: {
    default: "Webtray | Smart Inventory Management Software",
    template: "%s | Webtray"
  },
  description:
    "All-in-one SME commerce platform. Everything your business needs to thrive, in one powerful place.",
  openGraph: {
    title: "Webtray | Smart Inventory Management Software",
    description: "All-in-one SME commerce platform. Everything your business needs to thrive, in one powerful place.",
    url: "https://webtray.ng",
    siteName: "Webtray",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Webtray | Smart Inventory Management Software",
    description: "All-in-one SME commerce platform. Everything your business needs to thrive, in one powerful place.",
  },
  robots: {
    index: true,
    follow: true,
  },
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
          <main>{children}</main>
        </ReactQueryProvider>

        <Toaster />
      </body>
    </html>
  );
}
