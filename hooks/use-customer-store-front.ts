// use-customer-store-front.ts
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import { ApiResponse } from "@/types";

// Types based on your API response
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
  images: {
    main: string;
    thumbnail: string;
  };
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
  categories: (storeId: string) => [...storefrontKeys.all, "categories", storeId] as const,
  products: (storeId?: string, categoryIds?: number[]) => 
    categoryIds && categoryIds.length > 0
      ? [...storefrontKeys.all, "products", "filtered", storeId || "all", ...categoryIds.sort()]
      : [...storefrontKeys.all, "products", storeId || "all"],
};

export const useStorefront = (storeId: string = "ala-store") => {
  // Fetch categories for the specific store
  const categoriesQuery = useQuery({
    queryKey: storefrontKeys.categories(storeId),
    queryFn: async (): Promise<Category[]> => {
      const { data } = await api.get<ApiResponse<CategoriesResponse>>(
        `/storefront/${storeId}`
      );
      
      if (data?.responseSuccessful) {
        return data.responseBody.categories || [];
      }
      throw new Error(data?.responseMessage || "Failed to fetch categories");
    },
  });

  // Fetch all products for the store
  const productsQuery = useQuery({
    queryKey: storefrontKeys.products(storeId),
    queryFn: async (): Promise<Product[]> => {
      // For all products, we can either:
      // 1. Call the endpoint without any query parameters
      // 2. Or check if the API expects categoryIds parameter even when empty
      
      // Try without parameters first
      const { data } = await api.get<ApiResponse<ProductsResponse>>(
        `/storefront`
      );
      
      if (data?.responseSuccessful) {
        return data.responseBody.products || [];
      }
      throw new Error(data?.responseMessage || "Failed to fetch products");
    },
  });

  // Fetch products by multiple categories - GET with query parameters
  const useFilteredProducts = (categoryIds: number[]) => {
    return useQuery({
      queryKey: storefrontKeys.products(storeId, categoryIds),
      queryFn: async (): Promise<Product[]> => {
        if (categoryIds.length === 0) {
          return [];
        }
        
        // Format: /storefront?categoryIds=49,50
        const queryString = `categoryIds=${categoryIds.join(',')}`;
        
        console.log(`Fetching filtered products: /storefront?${queryString}`);
        
        const { data } = await api.get<ApiResponse<ProductsResponse>>(
          `/storefront?${queryString}`
        );
        
        if (data?.responseSuccessful) {
          console.log(`Received ${data.responseBody.products?.length || 0} filtered products`);
          return data.responseBody.products || [];
        }
        throw new Error(data?.responseMessage || "Failed to fetch filtered products");
      },
      enabled: categoryIds.length > 0,
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };

  return {
    // Categories
    categories: categoriesQuery.data || [],
    isFetchingCategories: categoriesQuery.isLoading,
    categoriesError: categoriesQuery.error,
    refetchCategories: categoriesQuery.refetch,

    // All Products
    products: productsQuery.data || [],
    isFetchingProducts: productsQuery.isLoading,
    productsError: productsQuery.error,
    refetchProducts: productsQuery.refetch,

    // Filtered Products
    useFilteredProducts,
  };
};