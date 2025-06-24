import api from "@/lib/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";
import { useAuthStore } from "@/store/useAuthStore";



// const setHasBusiness = useAuthStore((state) => state.setHasBusiness)

// types
interface CreateRegistrationPayload {
 businessName: string;
  description: string;
  businessType: string;
  category: {
    main: string;
  },
  address: string;
  storeName: string;
  slogan: string;
  customeDomain: string;
  currency: string;
  paymentMethods:{
    paystack: boolean;
    bankTransfer: boolean;
  }
  deliveryOptions: {
    inHouse: boolean;
   thirdParty: string[];
  }
}
interface Register {
  message: string;
  status: number;
  data: {
    businessId: string;
  };
}
interface ApiResponse<T> {
  responseSuccessful: boolean;
  responseMessage: string;
  responseBody: T;
}

// Query Keys
export const registrationKeys = {
  all: ['user'] as const,
  registers: () => [...registrationKeys.all, 'registers'] as const,
 
};


export const useRegistration = () => {
  const setHasBusiness = useAuthStore((state) => state.setHasBusiness)
 

  const registerUser = useMutation({
    mutationFn: async (payload: CreateRegistrationPayload): Promise<Register> => {
      const { data } = await api.post<ApiResponse<{ register: Register }>>("/user/complete", payload);
      if (data?.responseSuccessful) {
        return data.responseBody.register;
      }
      throw new Error(data?.responseMessage || "Failed to register");
    },
    onSuccess: () => {
      toast.success("Business registered successfully");
      setHasBusiness(true);
     

    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to register");
    
    },
  });

  const addRegister = async (payload: CreateRegistrationPayload) => {
    return registerUser.mutateAsync(payload);
  };

  return {
    addRegister,
    isRegisteringUser: registerUser.isPending,
    addRegisterError: registerUser.error,
    addRegisterSuccess: registerUser.isSuccess,
    resetRegister: registerUser.reset,
  };
};
