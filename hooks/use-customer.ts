// hooks/use-customer.ts
import api from "@/lib/axios";
import { ApiResponse, Customer, CustomerSummary } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/store/useAuthStore";

export interface CustomersResponse {
  customers: Customer[];
}

export const customerKeys = {
  all: ["customers"] as const,
  list: (storeId: string | number) => [...customerKeys.all, "list", storeId] as const,
  summary: (storeId: string | number) => [...customerKeys.all, "summary", storeId] as const,
};

export const useCustomer = () => {
  const { activeStore } = useAuthStore();
  const storeId = activeStore?.id;

  const customersQuery = useQuery({
    queryKey: customerKeys.list(storeId || ""),
    queryFn: async (): Promise<Customer[]> => {
      // Add a small delay to ensure data is fully ready
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const { data } = await api.get<ApiResponse<{ customers: Customer[] }>>(
        "/customer",
        {
          params: { storeId }
        }
      );
      
      console.log("✅ API Response:", data);
      
      if (!data?.responseSuccessful) {
        throw new Error(data?.responseMessage || "Failed to fetch customers");
      }

      const customers = data.responseBody.customers;
      
      // Validate data structure
      if (!Array.isArray(customers)) {
        console.error("❌ Invalid data: not an array", customers);
        throw new Error("Invalid data format");
      }

      // Transform and validate each customer
      const validatedCustomers = customers.map(customer => ({
        id: customer.id,
        fullname: customer.fullname || "Unknown",
        phone: customer.phone || "",
        email: customer.email || "",
        address: customer.address || null,
        totalOrders: Number(customer.totalOrders) || 0,
        totalSpent: Number(customer.totalSpent) || 0,
        createdAt: customer.createdAt,
        updatedAt: customer.updatedAt,
        status: "active" as const, // Default status
      }));

      console.log("✅ Validated customers:", validatedCustomers);
      return validatedCustomers;
    },
    enabled: !!storeId,
    staleTime: 60000, // 1 minute
    gcTime: 300000, // 5 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    // Critical: Don't return placeholder data
    placeholderData: undefined,
  });

  const customerSummaryQuery = useQuery({
    queryKey: customerKeys.summary(storeId || ""),
    queryFn: async (): Promise<CustomerSummary> => {
      const { data } = await api.get<ApiResponse<CustomerSummary>>(
        "/customer/customer-summary",
        { params: { storeId } }
      );
      
      if (data?.responseSuccessful) {
        return data.responseBody;
      }
      throw new Error(data?.responseMessage || "Failed to fetch customer summary");
    },
    enabled: !!storeId,
    staleTime: 60000,
    refetchOnWindowFocus: false,
  });

  return {
    // Data
    customers: customersQuery.data,
    customerSummary: customerSummaryQuery.data,
    
    // Loading states
    isLoading: customersQuery.isPending,
    isFetching: customersQuery.isFetching,
    
    // Success/Error states
    isSuccess: customersQuery.isSuccess,
    isError: customersQuery.isError,
    error: customersQuery.error,
    
    // Summary states
    isSummaryLoading: customerSummaryQuery.isPending,
    summaryError: customerSummaryQuery.error,
    
    // Refetch
    refetchCustomers: customersQuery.refetch,
    refetchSummary: customerSummaryQuery.refetch,
  };
};