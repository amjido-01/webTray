import { Metadata } from "next";

export function constructMetadata({
  title = "Webtray | Smart Inventory Management Software",
  description = "All-in-one SME commerce platform. Everything your business needs to thrive, in one powerful place.",
  image = "/api/og", // Default OG image fallback
  icons = "/favicon.ico",
  noIndex = false,
  url,
}: {
  title?: string;
  description?: string;
  image?: string | null;
  icons?: string;
  noIndex?: boolean;
  url?: string;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: url?.includes("/product/") ? "article" : "website",
      ...(image && {
        images: [
          {
            url: image,
          },
        ],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image && {
        images: [image],
      }),
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
