import api from "@/lib/axios";
import { ApiResponse, Customer, CustomerSummary } from "@/types";
import { useQuery } from "@tanstack/react-query";

export interface CustomersResponse {
  customers: Customer[];
}

export const customerKeys = {
  all: ["orders"] as const,
  customers: () => [...customerKeys.all, "list"] as const,

  summary: () => [...customerKeys.all, "summary"] as const,
};

export const useCustomer = () => {
  const customerSummaryQuery = useQuery({
    queryKey: customerKeys.summary(),
    queryFn: async (): Promise<CustomerSummary> => {
      const { data } = await api.get<ApiResponse<CustomerSummary>>(
        "/customer/customer-summary"
      );
      if (data?.responseSuccessful) {
        return data.responseBody;
      }
      throw new Error(
        data?.responseMessage || "Failed to fetch customer summary"
      );
    },
  });
  const customersQuery = useQuery({
    queryKey: customerKeys.customers(),
    queryFn: async (): Promise<Customer[]> => {
      const { data } = await api.get<ApiResponse<{ customers: Customer[] }>>(
        "/customer"
      );
      console.log(data.responseBody);
      if (data?.responseSuccessful) {
        return data.responseBody.customers;
      }
      throw new Error(data?.responseMessage || "Failed to fetch customers");
    },
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
