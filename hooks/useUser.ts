import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import { User, ApiResponse } from "@/types";

interface DashboardSummary {
  totalRevenue: number;
  noOfOrders: number;
  noOfProducts: number;
  noOfCustomers: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  orders: any[]; // You can type this more specifically based on your Order type
}

// Query Keys
export const userKeys = {
  all: ['users'] as const,
  profile: () => [...userKeys.all, 'profile'] as const,
   dashboard: () => [...userKeys.all, 'dashboard'] as const,
};

export const useUser = () => {
  const profileQuery = useQuery({
    queryKey: userKeys.profile(),
    queryFn: async (): Promise<User> => {
      const { data } = await api.get<ApiResponse<User>>("/user/profile");
      if (data?.responseSuccessful) {
        return data.responseBody;
      }
      throw new Error(data?.responseMessage || "Failed to fetch user profile");
    },
  });

  const dashboardQuery = useQuery({
    queryKey: userKeys.dashboard(),
    queryFn: async (): Promise<DashboardSummary> => {
      const { data } = await api.get<ApiResponse<DashboardSummary>>("/user/dashboard");
      if (data?.responseSuccessful) {
        return data.responseBody;
      }
      throw new Error(data?.responseMessage || "Failed to fetch dashboard summary");
    },
  });

  return {
    profile: profileQuery.data,
    isFetchingProfile: profileQuery.isLoading,
    profileError: profileQuery.error,
    refetchProfile: profileQuery.refetch,

    
    dashboard: dashboardQuery.data,
    isFetchingDashboard: dashboardQuery.isLoading,
    dashboardError: dashboardQuery.error,
    refetchDashboard: dashboardQuery.refetch,
  };
};