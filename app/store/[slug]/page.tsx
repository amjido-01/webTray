// app/store/[slug]/page.tsx
import React from 'react'
import { Metadata } from "next";
import { getStoreBySlug } from "@/lib/api/storefront";
import { constructMetadata } from "@/lib/metadata";
import StorefrontUI from '@/components/store-front-ui'

interface StorePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: StorePageProps): Promise<Metadata> {
  const { slug } = await params;
  const store = await getStoreBySlug(slug);

  if (!store) {
    return constructMetadata({
      title: "Store Not Found",
      description: "The store you are looking for does not exist.",
    });
  }

  return constructMetadata({
    title: store.storeName || "Webtray Store",
    description: store.description || `Welcome to ${store.storeName || "Webtray Store"} on Webtray.`,
    image: `/store/${slug}/opengraph-image`,
  });
}

const Page = async ({ params }: StorePageProps) => {
  const { slug } = await params
  
  return (
    <StorefrontUI slug={slug}/>
  )
}

export default Page