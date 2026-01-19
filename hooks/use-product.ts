import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import api from "@/lib/axios";
import {
  ApiResponse,
  Product,
  CreateProductPayload,
  UpdateProductPayload,
} from "@/types";
import { useAuthStore } from "@/store/useAuthStore";

export interface ProductResponse {
  product: Product;
}

export interface ProductsResponse {
  products: Product[];
}

// ✅ Updated productKeys so they always include storeId
export const productKeys = {
  all: ["inventory"] as const,
  products: (storeId: number | string | undefined) =>
    [...productKeys.all, "products", storeId] as const,
  product: (id: number, storeId: number | string | undefined) =>
    [...productKeys.all, "product", id, storeId] as const,
};

export const useProduct = () => {
  const { activeStore } = useAuthStore();
  const queryClient = useQueryClient();

  const storeId = activeStore?.id;

  const invalidateStoreQueries = (storeId: number | string) => {
    queryClient.invalidateQueries({
      predicate: (query) =>
        Array.isArray(query.queryKey) && query.queryKey.includes(storeId),
    });
  };

  const productsQuery = useQuery({
    queryKey: productKeys.products(storeId),
    queryFn: async (): Promise<Product[]> => {
      const { data } = await api.get<ApiResponse<{ products: Product[] }>>(
        "/inventory/product",
        { params: { storeId } }
      );
      if (data?.responseSuccessful) {
        return data.responseBody.products;
      }
      throw new Error(data?.responseMessage || "Failed to fetch products");
    },
    enabled: !!storeId,
  });

  const useProductQuery = (id: number) =>
    useQuery({
      queryKey: productKeys.product(id, storeId),
      queryFn: async (): Promise<Product> => {
        const { data } = await api.get<ApiResponse<{ product: Product }>>(
          `/inventory/product/${id}`
        );
        if (data?.responseSuccessful) {
          return data.responseBody.product;
        }
        throw new Error(data?.responseMessage || "Failed to fetch product");
      },
      enabled: !!id && !!storeId,
    });

  const getProduct = async (id: number): Promise<Product> => {
    const { data } = await api.get<ApiResponse<{ product: Product }>>(
      `/inventory/product/${id}`
    );
    if (data?.responseSuccessful) {
      return data.responseBody.product;
    }
    throw new Error(data?.responseMessage || "Failed to fetch product");
  };

const addProductMutation = useMutation({
  mutationFn: async (payload: CreateProductPayload | FormData): Promise<Product> => {
    // Check if payload is FormData (for file uploads)
    const isFormData = payload instanceof FormData;
    
    const { data } = await api.post<ApiResponse<{ product: Product }>>(
      "/inventory/product",
      payload,
      isFormData ? {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      } : undefined
    );
    
    if (data?.responseSuccessful) {
      return data.responseBody.product;
    }
    throw new Error(data?.responseMessage || "Failed to add product");
  },
  onSuccess: (newProduct) => {
    const targetStoreId = newProduct.storeId ?? storeId;
    if (targetStoreId !== undefined) {
      invalidateStoreQueries(targetStoreId);
    }
    toast.success("Product added successfully");
  },
  onError: (error: Error) => {
    toast.error(error.message || "Failed to add product");
  },
});

 const updateProductMutation = useMutation({
  mutationFn: async ({
    id,
    ...payload
  }: UpdateProductPayload): Promise<Product> => {
    const { data } = await api.patch<ApiResponse<{ product: Product }>>(
      `/inventory/product/${id}`,
      payload,
      { params: { storeId } }
    );
    if (data?.responseSuccessful) {
      return data.responseBody.product;
    }
    throw new Error(data?.responseMessage || "Failed to update product");
  },
  onSuccess: (updatedProduct) => {
    // ✅ Invalidate all queries for this store
    if (storeId) {
      queryClient.invalidateQueries({
        predicate: (query) =>
          Array.isArray(query.queryKey) && query.queryKey.includes(storeId),
      });
    }

    // ✅ Optimistically update the products list cache
    queryClient.setQueryData<Product[]>(productKeys.products(storeId), (old) => {
      if (!old) return old;
      return old.map(product => 
        product.id === updatedProduct.id ? updatedProduct : product
      );
    });

    // ✅ Optimistically update single product cache
    queryClient.setQueryData<Product>(
      productKeys.product(updatedProduct.id, storeId), 
      updatedProduct
    );

    toast.success("Product updated successfully");
  },
  onError: (error: Error) => {
    toast.error(error.message || "Failed to update product");
  },
});

const deleteProductMutation = useMutation({
  mutationFn: async (id: number): Promise<void> => {
    const { data } = await api.delete<ApiResponse<object>>(
      `/inventory/product/${id}`,
      { params: { storeId } } // <- include storeId as query param
    );
    if (!data?.responseSuccessful) {
      throw new Error(data?.responseMessage || "Failed to delete product");
    }
  },
  onSuccess: (_, deletedProductId) => {
    // ✅ Invalidate all queries for this store
    if (storeId) {
      queryClient.invalidateQueries({
        predicate: (query) =>
          Array.isArray(query.queryKey) && query.queryKey.includes(storeId),
      });
    }

    // ✅ Optimistically remove from products list cache
    queryClient.setQueryData<Product[]>(productKeys.products(storeId), (old) => {
      return old ? old.filter(product => product.id !== deletedProductId) : [];
    });

    // ✅ Remove single product cache
    queryClient.removeQueries({ queryKey: productKeys.product(deletedProductId, storeId) });

    toast.success("Product deleted successfully");
  },
  onError: (error: Error) => {
    toast.error(error.message || "Failed to delete product");
  },
});


  return {
    products: productsQuery.data,
    isFetchingProducts: productsQuery.isLoading,
    productsError: productsQuery.error,
    refetchProducts: productsQuery.refetch,
    getProduct,
    useProductQuery,
    addProduct: addProductMutation.mutateAsync,
    updateProduct: updateProductMutation.mutateAsync,
    deleteProduct: deleteProductMutation.mutateAsync,
    isAddingProduct: addProductMutation.isPending,
    isUpdatingProduct: updateProductMutation.isPending,
    isDeletingProduct: deleteProductMutation.isPending,
    addProductError: addProductMutation.error,
    updateProductError: updateProductMutation.error,
    deleteProductError: deleteProductMutation.error,
    addProductSuccess: addProductMutation.isSuccess,
    updateProductSuccess: updateProductMutation.isSuccess,
    deleteProductSuccess: deleteProductMutation.isSuccess,
    resetAddProduct: addProductMutation.reset,
    resetUpdateProduct: updateProductMutation.reset,
    resetDeleteProduct: deleteProductMutation.reset,
  };
};
