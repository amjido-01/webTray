import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import { ApiResponse } from "@/types";
import { useAuthStore } from "@/store/useAuthStore";
import { StoreFrontSummary, StoreProduct } from "@/types";
import { toast } from "sonner";

interface StoreProductsResponse {
  products: StoreProduct[];
}

interface StoreFrontInfo {
  store: {
    id: number;
    businessId: number;
    storeName: string;
    slogan: string;
    customDomain: string;
    paymentMethods: {
      paystack: boolean;
      bankTransfer: boolean;
    };
    deliveryOptions: {
      inHouse: boolean;
      thirdParty: string[];
    };
    status: string;
    currency: string;
    createdAt: string;
    updatedAt: string;
  };
  productCount: number;
}

interface ChangeProductVisibilityPayload {
  productId: number;
  visibility: boolean;
  storeId: number | string;
}

// Query Keys
export const storeFrontKeys = {
  all: ["storefront"] as const,
  summary: (storeId: number | string | undefined) =>
    [...storeFrontKeys.all, "summary", storeId] as const,
  products: (storeId: number | string | undefined) =>
    [...storeFrontKeys.all, "products", storeId] as const,
  info: (storeId: number | string | undefined) =>
    [...storeFrontKeys.all, "info", storeId] as const,
};

export const useStoreFront = () => {
  const { activeStore } = useAuthStore();
  const storeId = activeStore?.id;
  const queryClient = useQueryClient();

  const storeFrontSummaryQuery = useQuery({
    queryKey: storeFrontKeys.summary(storeId),
    queryFn: async (): Promise<StoreFrontSummary> => {
      const { data } = await api.get<ApiResponse<StoreFrontSummary>>(
        `/storefront/summary`,
        {
          params: { storeId },
        }
      );
      if (data?.responseSuccessful) {
        return data.responseBody;
      }
      throw new Error(data?.responseMessage || "Failed to fetch store front summary");
    },
    enabled: !!storeId,
  });

  const storeProductsQuery = useQuery({
    queryKey: storeFrontKeys.products(storeId),
    queryFn: async (): Promise<StoreProduct[]> => {
      const { data } = await api.get<ApiResponse<StoreProductsResponse>>(
        `/storefront/products`,
        {
          params: { storeId },
        }
      );
      if (data?.responseSuccessful) {
        return data.responseBody.products;
      }
      throw new Error(data?.responseMessage || "Failed to fetch store products");
    },
    enabled: !!storeId,
  });

  const storeFrontInfoQuery = useQuery({
    queryKey: storeFrontKeys.info(storeId),
    queryFn: async (): Promise<StoreFrontInfo> => {
      const { data } = await api.get<ApiResponse<StoreFrontInfo>>(
        `/storefront/info`,
        {
          params: { storeId },
        }
      );
      if (data?.responseSuccessful) {
        return data.responseBody;
      }
      throw new Error(data?.responseMessage || "Failed to fetch store front info");
    },
    enabled: !!storeId,
  });

  // ✅ Mutation for changing product visibility
  const changeProductVisibilityMutation = useMutation({
    mutationFn: async ({
      productId,
      visibility,
      storeId,
    }: ChangeProductVisibilityPayload) => {
      const { data } = await api.put<ApiResponse<{ product: StoreProduct }>>(
        `/storefront/products`,
        { productId, visibility },
        { params: { storeId } }
      );
      console.log(data)

      if (data?.responseSuccessful) {
        return data.responseBody.product;
      }

      throw new Error(
        data?.responseMessage || "Failed to update product visibility"
      );
    },

    onSuccess: (updatedProduct) => {
      toast.success("Product visibility updated successfully");

      // ✅ Refresh products list in cache
      queryClient.invalidateQueries({
        queryKey: storeFrontKeys.products(updatedProduct.storeId),
      });
    },

    onError: (error: Error) => {
      toast.error(error.message || "Error updating product visibility");
    },
  });

  const changeProductVisibility = async (payload: ChangeProductVisibilityPayload) => {
    return changeProductVisibilityMutation.mutateAsync(payload);
  };

  return {
    storefrontSummary: storeFrontSummaryQuery.data,
    isFetchingStorefrontSummary: storeFrontSummaryQuery.isLoading,
    storefrontSummaryError: storeFrontSummaryQuery.error,
    refetchStorefrontSummary: storeFrontSummaryQuery.refetch,

    storeProducts: storeProductsQuery.data,
    isFetchingStoreProducts: storeProductsQuery.isLoading,
    storeProductsError: storeProductsQuery.error,
    refetchStoreProducts: storeProductsQuery.refetch,

    storeInfo: storeFrontInfoQuery.data,
    isFetchingStoreInfo: storeFrontInfoQuery.isLoading,
    storeInfoError: storeFrontInfoQuery.error,
    refetchStoreInfo: storeFrontInfoQuery.refetch,

    // ✅ Visibility Mutations
    changeProductVisibility,
    isUpdatingProductVisibility: changeProductVisibilityMutation.isPending,
  };
};
