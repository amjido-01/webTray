import api from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { CreateRegistrationPayload, Register, ApiResponse } from "@/types";
import { toast } from "sonner";
import { useAuthStore } from "@/store/useAuthStore";



// const setHasBusiness = useAuthStore((state) => state.setHasBusiness)

// types



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
