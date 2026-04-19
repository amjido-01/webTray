import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import { toast } from "sonner";
import { ApiResponse } from "@/types";
import { ProfileSettingsFormData, PasswordSettingsFormData } from "@/schemas/settings.schema";
import { userKeys } from "./use-user";

export const useSettings = () => {
  const queryClient = useQueryClient();

  const updateProfileMutation = useMutation({
    mutationFn: async (payload: ProfileSettingsFormData) => {
      const { data } = await api.put<ApiResponse<any>>("/settings/profile", payload);
      if (data?.responseSuccessful) {
        return data.responseBody;
      }
      throw new Error(data?.responseMessage || "Failed to update profile");
    },
    onSuccess: () => {
      toast.success("Profile updated successfully");
      queryClient.invalidateQueries({ queryKey: userKeys.profile() });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update profile");
    },
  });

  const updatePasswordMutation = useMutation({
    mutationFn: async (payload: PasswordSettingsFormData) => {
      const { data } = await api.put<ApiResponse<any>>("/settings/password", payload);
      if (data?.responseSuccessful) {
        return data.responseBody;
      }
      throw new Error(data?.responseMessage || "Failed to update password");
    },
    onSuccess: () => {
      toast.success("Password updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update password");
    },
  });

  return {
    updateProfile: updateProfileMutation.mutateAsync,
    isUpdatingProfile: updateProfileMutation.isPending,
    
    updatePassword: updatePasswordMutation.mutateAsync,
    isUpdatingPassword: updatePasswordMutation.isPending,
  };
};
