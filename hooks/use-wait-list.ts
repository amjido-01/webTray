import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import api from "@/lib/axios";
import { ApiResponse } from "@/types";

export interface WaitlistPayload {
  fullName: string;
  businessName: string;
  businessType: string;
  phone: string;
  email: string;
  location: string;
  how: string;
}

export interface WaitlistEntry {
  id: number;
  fullName: string;
  businessName: string;
  businessType: string;
  phone: string;
  email: string;
  location: string;
  how: string;
  createdAt: string;
}

export const useWaitlist = () => {
  const addWaitlistMutation = useMutation({
    mutationFn: async (payload: WaitlistPayload): Promise<WaitlistEntry> => {
      const { data } = await api.post<ApiResponse<{ waitlist: WaitlistEntry }>>(
        "/user/waitlist",
        payload
      );

      if (data?.responseSuccessful) {
        return data.responseBody.waitlist;
      }

      throw new Error(data?.responseMessage || "Failed to join waitlist");
    },

    onSuccess: () => {
      toast.success("Successfully joined the waitlist");
    },

    onError: (error: Error) => {
      toast.error(error.message || "Failed to join waitlist");
    },
  });

  return {
    joinWaitlist: addWaitlistMutation.mutateAsync,
    isJoiningWaitlist: addWaitlistMutation.isPending,
    joinWaitlistError: addWaitlistMutation.error,
    joinWaitlistSuccess: addWaitlistMutation.isSuccess,
    resetJoinWaitlist: addWaitlistMutation.reset,
  };
};
