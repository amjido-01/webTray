import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import api from "@/lib/axios";
import {
  ApiResponse,
  Category,
  CreateCategoryPayload,
  InventorySummary,
} from "@/types";

interface UpdateCategoryPayload extends CreateCategoryPayload {
  id: number;
}

// Query Keys
export const categoryKeys = {
  all: ["inventory"] as const,
  categories: () => [...categoryKeys.all, "categories"] as const,
  category: (id: number) => [...categoryKeys.categories(), id] as const,
};

export const useCategory = () => {
  const queryClient = useQueryClient();

  const categoriesQuery = useQuery({
    queryKey: categoryKeys.categories(),
    queryFn: async (): Promise<Category[]> => {
      const { data } = await api.get<ApiResponse<{ categories: Category[] }>>(
        "/inventory/category"
      );
      if (data?.responseSuccessful) {
        return data.responseBody.categories;
      }
      throw new Error(data?.responseMessage || "Failed to fetch categories");
    },
  });

  const useCategoryQuery = (id: number) =>
    useQuery({
      queryKey: categoryKeys.category(id),
      queryFn: async (): Promise<Category> => {
        const { data } = await api.get<ApiResponse<{ category: Category }>>(
          `/inventory/category/${id}`
        );
        if (data?.responseSuccessful) {
          return data.responseBody.category;
        }
        throw new Error(data?.responseMessage || "Failed to fetch category");
      },
      enabled: !!id,
    });

  const getCategory = async (id: number): Promise<Category> => {
    const { data } = await api.get<ApiResponse<{ category: Category }>>(
      `/inventory/category/${id}`
    );
    if (data?.responseSuccessful) {
      return data.responseBody.category;
    }
    throw new Error(data?.responseMessage || "Failed to fetch category");
  };

  const addCategoryMutation = useMutation({
    mutationFn: async (payload: CreateCategoryPayload): Promise<Category> => {
      const { data } = await api.post<ApiResponse<{ category: Category }>>(
        "/inventory/category",
        payload
      );
      if (data?.responseSuccessful) {
        return data.responseBody.category;
      }
      throw new Error(data?.responseMessage || "Failed to add category");
    },
    onSuccess: (newCategory) => {
      // Invalidate and refetch categories
      queryClient.invalidateQueries({ queryKey: categoryKeys.categories() });

      // Optimistically update the categories cache
      queryClient.setQueryData<Category[]>(categoryKeys.categories(), (old) => {
        return old ? [...old, newCategory] : [newCategory];
      });

      toast.success("Category added successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to add category");
    },
  });

  const addCategory = async (payload: CreateCategoryPayload) => {
    return addCategoryMutation.mutateAsync(payload);
  };

  const updateCategoryMutation = useMutation({
    mutationFn: async ({
      id,
      ...payload
    }: UpdateCategoryPayload): Promise<Category> => {
      const { data } = await api.put<ApiResponse<{ category: Category }>>(
        `/inventory/category/${id}`,
        payload
      );
      if (data?.responseSuccessful) {
        return data.responseBody.category;
      }
      throw new Error(data?.responseMessage || "Failed to update category");
    },
    onSuccess: (updatedCategory) => {
      // Update specific category in cache
      queryClient.setQueryData<Category>(
        categoryKeys.category(updatedCategory.id),
        updatedCategory
      );

      // Update categories list cache
      queryClient.setQueryData<Category[]>(categoryKeys.categories(), (old) => {
        return old
          ? old.map((cat) =>
              cat.id === updatedCategory.id ? updatedCategory : cat
            )
          : [updatedCategory];
      });

      toast.success("Category updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update category");
    },
  });

  const updateCategory = async (payload: UpdateCategoryPayload) => {
    return updateCategoryMutation.mutateAsync(payload);
  };

  const deleteCategoryMutation = useMutation({
    mutationFn: async (id: number): Promise<void> => {
      const { data } = await api.delete<ApiResponse<object>>(
        `/inventory/category/${id}`
      );
      if (!data?.responseSuccessful) {
        throw new Error(data?.responseMessage || "Failed to delete category");
      }
    },
    onSuccess: (_, deletedId) => {
      // Remove from categories cache
      queryClient.setQueryData<Category[]>(categoryKeys.categories(), (old) => {
        return old ? old.filter((cat) => cat.id !== deletedId) : [];
      });

      // Remove specific category cache
      queryClient.removeQueries({ queryKey: categoryKeys.category(deletedId) });

      toast.success("Category deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete category");
    },
  });

  const deleteCategory = async (id: number) => {
    return deleteCategoryMutation.mutateAsync(id);
  };

  const inventorySummaryQuery = useQuery({
    queryKey: [...categoryKeys.all, "summary"],
    queryFn: async (): Promise<InventorySummary> => {
      const { data } = await api.get<ApiResponse<InventorySummary>>(
        "/inventory/inventory-summary"
      );

      if (data?.responseSuccessful) {
        return data.responseBody;
      }
      throw new Error(
        data?.responseMessage || "Failed to fetch inventory summary"
      );
    },
  });

  return {
    categories: categoriesQuery.data,
    isFetchingCategories: categoriesQuery.isLoading,
    categoriesError: categoriesQuery.error,
    refetchCategories: categoriesQuery.refetch,
    getCategory,
    useCategoryQuery,

    addCategory,
    updateCategory,
    deleteCategory,

    isAddingCategory: addCategoryMutation.isPending,
    isUpdatingCategory: updateCategoryMutation.isPending,
    isDeletingCategory: deleteCategoryMutation.isPending,

    addCategoryError: addCategoryMutation.error,
    updateCategoryError: updateCategoryMutation.error,
    deleteCategoryError: deleteCategoryMutation.error,

    addCategorySuccess: addCategoryMutation.isSuccess,
    updateCategorySuccess: updateCategoryMutation.isSuccess,
    deleteCategorySuccess: deleteCategoryMutation.isSuccess,

    resetAddCategory: addCategoryMutation.reset,
    resetUpdateCategory: updateCategoryMutation.reset,
    resetDeleteCategory: deleteCategoryMutation.reset,

    inventorySummary: inventorySummaryQuery.data,
    isFetchingInventorySummary: inventorySummaryQuery.isLoading,
    inventorySummaryError: inventorySummaryQuery.error,
    refetchInventorySummary: inventorySummaryQuery.refetch,
  };
};
