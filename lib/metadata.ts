import { Metadata } from "next";

export function constructMetadata({
  title = "Webtray | Smart Inventory Management Software",
  description = "All-in-one SME commerce platform. Everything your business needs to thrive, in one powerful place.",
  image = "/api/og", // Default OG image fallback
  icons = "/favicon.ico",
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string | null;
  icons?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: image
        ? [
            {
              url: image,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : [],
      creator: "@webtray",
    },
    icons,
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://webtray.ng"),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
