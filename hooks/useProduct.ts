import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import api from "@/lib/axios";
import { ApiResponse, Product, CreateProductPayload, UpdateProductPayload } from "@/types";
import { categoryKeys } from "./useCategory";

// interface UpdateProductPayload extends CreateProductPayload {
//   id: number;
// }

export interface ProductResponse {
  product: Product;
}

export interface ProductsResponse {
  products: Product[];
}

// Query Keys
export const productKeys = {
  all: ["inventory"] as const,
  products: () => [...productKeys.all, "products"] as const,
  product: (id: number) => [...productKeys.products(), id] as const,
};

export const useProduct = () => {
  const queryClient = useQueryClient();

  const productsQuery = useQuery({
    queryKey: productKeys.products(),
    queryFn: async (): Promise<Product[]> => {
      const { data } = await api.get<ApiResponse<{ products: Product[] }>>(
        "/inventory/product"
      );
      if (data?.responseSuccessful) {
        return data.responseBody.products;
      }
      throw new Error(data?.responseMessage || "Failed to fetch products");
    },
  });

  const useProductQuery = (id: number) =>
    useQuery({
      queryKey: productKeys.product(id),
      queryFn: async (): Promise<Product> => {
        const { data } = await api.get<ApiResponse<{ product: Product }>>(
          `/inventory/product/${id}`
        );
        if (data?.responseSuccessful) {
          return data.responseBody.product;
        }
        throw new Error(data?.responseMessage || "Failed to fetch product");
      },
      enabled: !!id,
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
    mutationFn: async (payload: CreateProductPayload): Promise<Product> => {
      const { data } = await api.post<ApiResponse<{ product: Product }>>(
        "/inventory/product",
        payload
      );
      if (data?.responseSuccessful) {
        return data.responseBody.product;
      }
      throw new Error(data?.responseMessage || "Failed to add product");
    },
    onSuccess: (newProduct) => {
      // Invalidate and refetch products
      queryClient.invalidateQueries({ queryKey: productKeys.products() });
      queryClient.invalidateQueries({
        queryKey: [...categoryKeys.all, "summary"],
      });

      // Optimistically update the products cache
      queryClient.setQueryData<Product[]>(productKeys.products(), (old) => {
        return old ? [...old, newProduct] : [newProduct];
      });

      toast.success("Product added successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to add product");
    },
  });

  const addProduct = async (payload: CreateProductPayload) => {
    return addProductMutation.mutateAsync(payload);
  };

  const updateProductMutation = useMutation({
    mutationFn: async ({
      id,
      ...payload
    }: UpdateProductPayload): Promise<Product> => {
      // Change from PUT to PATCH to match your API
      const { data } = await api.patch<ApiResponse<{ product: Product }>>(
        `/inventory/product/${id}`,
        payload
      );
      if (data?.responseSuccessful) {
        return data.responseBody.product;
      }
      throw new Error(data?.responseMessage || "Failed to update product");
    },
    onSuccess: (updatedProduct) => {
      // Update specific product in cache
      queryClient.setQueryData<Product>(
        productKeys.product(updatedProduct.id),
        updatedProduct
      );

      // Update products list cache
      queryClient.setQueryData<Product[]>(productKeys.products(), (old) => {
        return old
          ? old.map((prod) =>
              prod.id === updatedProduct.id ? updatedProduct : prod
            )
          : [updatedProduct];
      });

      toast.success("Product updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update product");
    },
  });

  const updateProduct = async (payload: UpdateProductPayload) => {
    return updateProductMutation.mutateAsync(payload);
  };
  const deleteProductMutation = useMutation({
    mutationFn: async (id: number): Promise<void> => {
      const { data } = await api.delete<ApiResponse<object>>(
        `/inventory/product/${id}`
      );
      if (!data?.responseSuccessful) {
        throw new Error(data?.responseMessage || "Failed to delete product");
      }
    },
    onSuccess: (_, deletedId) => {
      // Remove from products cache
      queryClient.setQueryData<Product[]>(productKeys.products(), (old) => {
        return old ? old.filter((prod) => prod.id !== deletedId) : [];
      });

      // Remove specific product cache
      queryClient.removeQueries({ queryKey: productKeys.product(deletedId) });
      queryClient.invalidateQueries({
        queryKey: [...categoryKeys.all, "summary"],
      });
      queryClient.invalidateQueries({ queryKey: productKeys.products() });
      toast.success("Product deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete product");
    },
  });

  const deleteProduct = async (id: number) => {
    return deleteProductMutation.mutateAsync(id);
  };

  return {
    products: productsQuery.data,
    isFetchingProducts: productsQuery.isLoading,
    productsError: productsQuery.error,
    refetchProducts: productsQuery.refetch,
    getProduct,
    useProductQuery,

    addProduct,
    updateProduct,
    deleteProduct,

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
