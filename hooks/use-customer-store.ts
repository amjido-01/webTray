import { useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import { ApiResponse, Store } from "@/types";
import { useEffect } from "react";

// Initialize the same broadcast channel for cross-tab synchronization
const syncChannel = typeof window !== "undefined" ? new BroadcastChannel("webtray_store_sync") : null;

export interface Category {
  id: number;
  storeId: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: number;
  storeId: number;
  categoryId: number;
  name: string;
  description: string;
  price: string;
  quantity: number;
  images: string[]
  visible: boolean;
  feature: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CategoriesResponse {
  store: Store;
  categories: Category[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ProductsResponse {
  products: Product[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Query Keys
export const storefrontKeys = {
  all: ["storefront"] as const,
  store: (slug: string) => [...storefrontKeys.all, slug] as const,
  categories: (slug: string) =>
    [...storefrontKeys.store(slug), "categories"] as const,
  products: (slug: string) =>
    [...storefrontKeys.store(slug), "products"] as const,
  productsByCategory: (slug: string, categoryIds: number[]) =>
    [
      ...storefrontKeys.store(slug),
      "products",
      "category",
      categoryIds.sort().join(','), // Better: use joined string for stable key
    ] as const,
};

export const useStorefront = (slug: string) => {
  const queryClient = useQueryClient();

  // Listen for updates from other tabs (like the Dashboard)
  useEffect(() => {
    if (!syncChannel) return;

    const handleMessage = (event: MessageEvent) => {
      // If any store/product update happens, we refresh the storefront data
      if (event.data.type === "PRODUCT_UPDATED" || event.data.type === "STORE_STATUS_UPDATED") {
        console.log("[Sync] Update received from dashboard, refreshing storefront...");
        queryClient.invalidateQueries({ queryKey: storefrontKeys.store(slug) });
      }
    };

    syncChannel.addEventListener("message", handleMessage);
    return () => syncChannel.removeEventListener("message", handleMessage);
  }, [slug, queryClient]);

  // 1. Fetch store categories by slug
  const categoriesQuery = useQuery({
    queryKey: storefrontKeys.categories(slug),
    queryFn: async (): Promise<CategoriesResponse> => {
      const { data } = await api.get<ApiResponse<CategoriesResponse>>(
        `/storefront/${slug}`
      );
      if (data?.responseSuccessful) {
        console.log(data.responseBody, "data.responseBody")
        return data.responseBody;
      }
      throw new Error(data?.responseMessage || "Failed to fetch storefront details");
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // 2. Fetch all products by store slug
  const allProductsQuery = useQuery({
    queryKey: storefrontKeys.products(slug),
    queryFn: async (): Promise<Product[]> => {
      const { data } = await api.get<ApiResponse<ProductsResponse>>(
        `/storefront/products/${slug}?limit=1000`
      );
      if (data?.responseSuccessful) {
        return data.responseBody.products || [];
      }
      throw new Error(data?.responseMessage || "Failed to fetch products");
    },
    staleTime: 5 * 60 * 1000,
  });

  // 3. Fetch products by category IDs
  const useProductsByCategory = (categoryIds: number[]) => {
    return useQuery({
      queryKey: storefrontKeys.productsByCategory(slug, categoryIds),
      queryFn: async (): Promise<Product[]> => {
        if (categoryIds.length === 0) {
          return [];
        }

        // Request a large limit to get all products (or use pagination)
        const queryString = `categoryIds=${categoryIds.join(",")}&limit=1000`;
        const { data } = await api.get<ApiResponse<ProductsResponse>>(
          `/storefront?${queryString}`
        );

        if (data?.responseSuccessful) {
          return data.responseBody.products || [];
        }
        throw new Error(
          data?.responseMessage || "Failed to fetch products by category"
        );
      },
      enabled: categoryIds.length > 0,
      staleTime: 5 * 60 * 1000,
    });
  };

  return {
    // Store info
    store: categoriesQuery.data?.store,
    isFetchingStore: categoriesQuery.isLoading,

    // Categories
    categories: categoriesQuery.data?.categories || [],
    isFetchingCategories: categoriesQuery.isLoading,
    categoriesError: categoriesQuery.error,
    refetchCategories: categoriesQuery.refetch,

    // All Products
    allProducts: allProductsQuery.data || [],
    isFetchingAllProducts: allProductsQuery.isLoading,
    allProductsError: allProductsQuery.error,
    refetchAllProducts: allProductsQuery.refetch,

    // Products by Category (hook to use)
    useProductsByCategory,
  };
};