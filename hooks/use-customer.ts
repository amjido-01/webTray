import api from "@/lib/axios";
import { ApiResponse, Customer, CustomerSummary } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/store/useAuthStore";
export interface CustomersResponse {
  customers: Customer[];
}

export const customerKeys = {
  all: ["orders"] as const,
  customers: () => [...customerKeys.all, "list"] as const,

  summary: () => [...customerKeys.all, "summary"] as const,
};

export const useCustomer = () => {
  const { activeStore } = useAuthStore();
  const storeId = activeStore?.id;


const customerSummaryQuery = useQuery({
  queryKey: [...customerKeys.summary(), storeId],
  queryFn: async (): Promise<CustomerSummary> => {
    const { data } = await api.get<ApiResponse<CustomerSummary>>(
      "/customer/customer-summary",
      {
        params: {
          storeId: storeId
        }
      }
    );
    if (data?.responseSuccessful) {
      return data.responseBody;
    }
    throw new Error(
      data?.responseMessage || "Failed to fetch customer summary"
    );
  },
  enabled: !!storeId,
});


const customersQuery = useQuery({
  queryKey: [...customerKeys.customers(), storeId],
  queryFn: async (): Promise<Customer[]> => {
    const { data } = await api.get<ApiResponse<{ customers: Customer[] }>>(
      "/customer",
      {
        params: {
          storeId: storeId
        }
      }
    );
    if (data?.responseSuccessful) {
      return data.responseBody.customers;
    }
    throw new Error(data?.responseMessage || "Failed to fetch customers");
  },
  enabled: !!storeId,
});


  return {
    //data
    Customers: customersQuery.data,
    CustomerSummary: customerSummaryQuery.data,

    //fetching
    isFetchingCustomers: customersQuery.isLoading,
    isFetchingCustomerSummary: customerSummaryQuery.isLoading,
    //error
    customersError: customersQuery.error,
    customerSummaryError: customerSummaryQuery.error,

    //refetch
    refetchCustomerSummary: customerSummaryQuery.refetch,
    refetchCustomers: customersQuery.refetch,
  };
};
