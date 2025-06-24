import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import { toast } from "sonner";
import { User, ApiResponse, DashboardSummary, CreateRegistrationPayload, Register, } from "@/types";
import { useAuthStore } from "@/store/useAuthStore";

// Query Keys
export const userKeys = {
  all: ['users'] as const,
  profile: () => [...userKeys.all, 'profile'] as const,
   dashboard: () => [...userKeys.all, 'dashboard'] as const,
};

export const useUser = () => {
  const queryClient = useQueryClient();
  const setHasBusiness = useAuthStore((state) => state.setHasBusiness);

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
      console.log(data)
      if (data?.responseSuccessful) {
        return data.responseBody;
      }
      throw new Error(data?.responseMessage || "Failed to fetch dashboard summary");
    },
  });

    const registerBusinessMutation = useMutation({
    mutationFn: async (payload: CreateRegistrationPayload): Promise<Register> => {
      const { data } = await api.post<ApiResponse<{ register: Register }>>("/user/complete", payload);
      if (data?.responseSuccessful) {
        return data.responseBody.register;
      }
      throw new Error(data?.responseMessage || "Failed to register business");
    },
    onSuccess: () => {
      toast.success("Business registered successfully");
      setHasBusiness(true);
      // You can also refetch profile or dashboard if needed
      queryClient.invalidateQueries({ queryKey: userKeys.profile() }); 
    },
    onError: (error: Error) => {
      toast.error(error.message || "Business registration failed");
    },
  });

    const registerBusiness = async (payload: CreateRegistrationPayload) => {
    return registerBusinessMutation.mutateAsync(payload);
  };

  return {
    profile: profileQuery.data,
    isFetchingProfile: profileQuery.isLoading,
    profileError: profileQuery.error,
    refetchProfile: profileQuery.refetch,

    
    dashboard: dashboardQuery.data,
    isFetchingDashboard: dashboardQuery.isLoading,
    dashboardError: dashboardQuery.error,
    refetchDashboard: dashboardQuery.refetch,

      // Business Registration
    registerBusiness,
    isRegisteringBusiness: registerBusinessMutation.isPending,
    registerBusinessError: registerBusinessMutation.error,
    registerBusinessSuccess: registerBusinessMutation.isSuccess,
    resetRegisterBusiness: registerBusinessMutation.reset,
  };
};