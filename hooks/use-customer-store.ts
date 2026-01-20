// ============================================
// FILE: hooks/use-storefront.ts
// ============================================
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import { ApiResponse } from "@/types";

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
  // 1. Fetch store categories by slug
  const categoriesQuery = useQuery({
    queryKey: storefrontKeys.categories(slug),
    queryFn: async (): Promise<Category[]> => {
      const { data } = await api.get<ApiResponse<CategoriesResponse>>(
        `/storefront/${slug}`
      );
      if (data?.responseSuccessful) {
        return data.responseBody.categories || [];
      }
      throw new Error(data?.responseMessage || "Failed to fetch categories");
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // 2. Fetch all products by store slug
  const allProductsQuery = useQuery({
    queryKey: storefrontKeys.products(slug),
    queryFn: async (): Promise<Product[]> => {
      const { data } = await api.get<ApiResponse<ProductsResponse>>(
        `/storefront/products/${slug}`
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

        console.log('Request URL:', `/storefront?${queryString}`);
        console.log('Response data:', data);

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
    // Categories
    categories: categoriesQuery.data || [],
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