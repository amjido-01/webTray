import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import api from "@/lib/axios";
import {
  ApiResponse,
  Category,
  CreateCategoryPayload,
  InventorySummary,
} from "@/types";
import { useAuthStore } from "@/store/useAuthStore";

// ✅ Updated Query Keys to Always Include storeId
export const categoryKeys = {
  all: ["inventory"] as const,
  categories: (storeId: number | string | undefined) =>
    [...categoryKeys.all, "categories", storeId] as const,
  category: (id: number, storeId: number | string | undefined) =>
    [...categoryKeys.all, "category", id, storeId] as const,
  summary: (storeId: number | string | undefined) =>
    [...categoryKeys.all, "summary", storeId] as const,
};

export const useCategory = () => {
  const { activeStore } = useAuthStore();
  const queryClient = useQueryClient();
  const storeId = activeStore?.id;

  const invalidateStoreCategories = () => {
    if (!storeId) return;
    queryClient.invalidateQueries({
      predicate: (query) =>
        Array.isArray(query.queryKey) && query.queryKey.includes(storeId),
    });
  };

  const categoriesQuery = useQuery({
    queryKey: categoryKeys.categories(storeId),
    queryFn: async (): Promise<Category[]> => {
      const { data } = await api.get<ApiResponse<{ categories: Category[] }>>(
        "/inventory/category",
        { params: { storeId } }
      );
      if (data?.responseSuccessful) return data.responseBody.categories;
      throw new Error(data?.responseMessage || "Failed to fetch categories");
    },
    enabled: !!storeId,
  });

  const useCategoryQuery = (id: number) =>
    useQuery({
      queryKey: categoryKeys.category(id, storeId),
      queryFn: async (): Promise<Category> => {
        const { data } = await api.get<ApiResponse<{ category: Category }>>(
          `/inventory/category/${id}`
        );
        if (data?.responseSuccessful) return data.responseBody.category;
        throw new Error(data?.responseMessage || "Failed to fetch category");
      },
      enabled: !!id && !!storeId,
    });

  const addCategoryMutation = useMutation({
    mutationFn: async (payload: CreateCategoryPayload): Promise<Category> => {
      const { data } = await api.post<ApiResponse<{ category: Category }>>(
        "/inventory/category",
        payload
      );
      if (data?.responseSuccessful) return data.responseBody.category;
      throw new Error(data?.responseMessage || "Failed to add category");
    },
    onSuccess: () => {
      invalidateStoreCategories();
      toast.success("Category added successfully");
    },
    onError: (error: Error) => toast.error(error.message || "Failed to add category"),
  });

 const updateCategoryMutation = useMutation({
  mutationFn: async ({
    id,
    ...payload
  }: { id: number } & CreateCategoryPayload): Promise<Category> => {
    const { data } = await api.put<ApiResponse<{ category: Category }>>(
      `/inventory/category/${id}`,
      payload
    );
    if (data?.responseSuccessful) return data.responseBody.category;
    throw new Error(data?.responseMessage || "Failed to update category");
  },
  onSuccess: (updatedCategory) => {
    // ✅ Invalidate all queries for this store
    invalidateStoreCategories();

    // ✅ Optimistically update the categories list cache
    queryClient.setQueryData<Category[]>(categoryKeys.categories(storeId), (old) => {
      if (!old) return old;
      return old.map(category => 
        category.id === updatedCategory.id ? updatedCategory : category
      );
    });

    // ✅ Optimistically update single category cache
    queryClient.setQueryData<Category>(
      categoryKeys.category(updatedCategory.id, storeId), 
      updatedCategory
    );

    toast.success("Category updated successfully");
  },
  onError: (error: Error) => toast.error(error.message || "Failed to update category"),
});

const deleteCategoryMutation = useMutation({
  mutationFn: async (id: number): Promise<void> => {
    const { data } = await api.delete<ApiResponse<object>>(
      `/inventory/category/${id}`
    );
    if (!data?.responseSuccessful) throw new Error(data?.responseMessage || "Failed to delete category");
  },
  onSuccess: (_, deletedCategoryId) => {
    // ✅ Invalidate all queries for this store
    invalidateStoreCategories();

    // ✅ Optimistically remove from categories list cache
    queryClient.setQueryData<Category[]>(categoryKeys.categories(storeId), (old) => {
      return old ? old.filter(category => category.id !== deletedCategoryId) : [];
    });

    // ✅ Remove single category cache
    queryClient.removeQueries({ queryKey: categoryKeys.category(deletedCategoryId, storeId) });

    toast.success("Category deleted successfully");
  },
  onError: (error: Error) => toast.error(error.message || "Failed to delete category"),
});

  const inventorySummaryQuery = useQuery({
    queryKey: categoryKeys.summary(storeId),
    queryFn: async (): Promise<InventorySummary> => {
      const { data } = await api.get<ApiResponse<InventorySummary>>(
        "/inventory/inventory-summary",
        { params: { storeId } }
      );
      if (data?.responseSuccessful) return data.responseBody;
      throw new Error(data?.responseMessage || "Failed to fetch inventory summary");
    },
    enabled: !!storeId,
  });

  return {
    categories: categoriesQuery.data,
    isFetchingCategories: categoriesQuery.isLoading,
    categoriesError: categoriesQuery.error,
    refetchCategories: categoriesQuery.refetch,
    useCategoryQuery,

    addCategory: addCategoryMutation.mutateAsync,
    updateCategory: updateCategoryMutation.mutateAsync,
    deleteCategory: deleteCategoryMutation.mutateAsync,

    isAddingCategory: addCategoryMutation.isPending,
    isUpdatingCategory: updateCategoryMutation.isPending,
    isDeletingCategory: deleteCategoryMutation.isPending,

    inventorySummary: inventorySummaryQuery.data,
    isFetchingInventorySummary: inventorySummaryQuery.isLoading,
    inventorySummaryError: inventorySummaryQuery.error,
  };
};
