import { Metadata } from "next";
import { getProductById, getStoreBySlug } from "@/lib/api/storefront";
import { constructMetadata } from "@/lib/metadata";
import { ProductClient } from "./_components/product-client";

interface ProductDetailPageProps {
  params: Promise<{
    slug: string;
    productId: string;
  }>;
}

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { slug, productId } = await params;
  const product = await getProductById(slug, productId);
  const store = await getStoreBySlug(slug);

  if (!product) {
    return constructMetadata({
      title: "Product Not Found",
      description: "The product you are looking for does not exist.",
    });
  }

  return constructMetadata({
    title: `${product.name} | ${store?.name || "Webtray Store"}`,
    description: product.description || `Buy ${product.name} at ${store?.name || "our store"}.`,
    image: `/store/${slug}/product/${productId}/opengraph-image`,
  });
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug, productId } = await params;

  return <ProductClient slug={slug} productId={productId} />;
}
