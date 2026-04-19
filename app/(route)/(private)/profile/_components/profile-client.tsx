"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUser } from "@/hooks/use-user";
import { useSettings } from "@/hooks/use-settings";
import { 
  profileSettingsSchema, 
  passwordSettingsSchema, 
  ProfileSettingsFormData, 
  PasswordSettingsFormData 
} from "@/schemas/settings.schema";
import { Input } from "@/components/ui/input";
import { Loader2, User, KeyRound } from "lucide-react";

export function ProfileClient() {
  const { profile, isFetchingProfile } = useUser();
  const { updateProfile, isUpdatingProfile, updatePassword, isUpdatingPassword } = useSettings();

  // Profile Form
  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    reset: resetProfile,
    formState: { errors: profileErrors },
  } = useForm<ProfileSettingsFormData>({
    resolver: yupResolver(profileSettingsSchema),
    defaultValues: {
      fullname: "",
      phone: "",
      email: "",
    },
  });

  // Password Form
  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    reset: resetPassword,
    formState: { errors: passwordErrors },
  } = useForm<PasswordSettingsFormData>({
    resolver: yupResolver(passwordSettingsSchema),
    defaultValues: {
      currentpassword: "",
      newpassword: "",
      confirmnewpassword: "",
    },
  });

  useEffect(() => {
    if (profile) {
      resetProfile({
        fullname: profile.fullname || "",
        phone: profile.phone || "",
        email: profile.email || "",
      });
    }
  }, [profile, resetProfile]);

  const onProfileSubmit = async (data: ProfileSettingsFormData) => {
    await updateProfile(data);
  };

  const onPasswordSubmit = async (data: PasswordSettingsFormData) => {
    try {
      await updatePassword(data);
      resetPassword(); // clear fields on success
    } catch (error) {}
  };

  if (isFetchingProfile && !profile) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <div className="grid gap-8 md:grid-cols-2 max-w-6xl w-full">
      
      {/* Profile Section */}
      <div className="flex flex-col h-full bg-white rounded-[24px] shadow-sm border border-gray-100 p-8 md:p-10 transition-all hover:shadow-md">
        <div className="flex items-center gap-4 mb-2">
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-50">
            <User className="w-5 h-5 text-[#3b5bdb]" />
          </div>
          <div>
            <h3 className="text-[20px] font-semibold text-gray-800">Basic Information</h3>
            <p className="text-[14px] text-gray-500 mt-0.5">Update your name and contact details.</p>
          </div>
        </div>

        <form onSubmit={handleProfileSubmit(onProfileSubmit)} className="flex flex-col space-y-6 mt-8 h-full">
          <div className="space-y-2">
            <label htmlFor="fullname" className="text-[15px] font-medium text-gray-700">Full Name</label>
            <Input
              id="fullname"
              placeholder="Faruq Abiodun"
              className="rounded-xl h-[48px] bg-gray-50/50 border-gray-200 focus-visible:ring-1 focus-visible:ring-[#3b5bdb] px-4"
              {...registerProfile("fullname")}
            />
            {profileErrors.fullname && (
              <p className="text-sm text-red-500">{profileErrors.fullname.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className="text-[15px] font-medium text-gray-700">Phone Number</label>
            <Input
              id="phone"
              placeholder="08080779683"
              className="rounded-xl h-[48px] bg-gray-50/50 border-gray-200 focus-visible:ring-1 focus-visible:ring-[#3b5bdb] px-4"
              {...registerProfile("phone")}
            />
            {profileErrors.phone && (
              <p className="text-sm text-red-500">{profileErrors.phone.message}</p>
            )}
          </div>

          <div className="space-y-2 pb-2">
            <label htmlFor="email" className="text-[15px] font-medium text-gray-700">Email Address</label>
            <Input
              id="email"
              type="email"
              placeholder="email@example.com"
              className="rounded-xl h-[48px] bg-gray-50/50 border-gray-200 focus-visible:ring-1 focus-visible:ring-[#3b5bdb] px-4"
              {...registerProfile("email")}
            />
            {profileErrors.email && (
              <p className="text-sm text-red-500">{profileErrors.email.message}</p>
            )}
          </div>

          <div className="mt-auto pt-6 border-t border-gray-100">
            <button 
              type="submit" 
              disabled={isUpdatingProfile} 
              className="w-full h-[48px] bg-[#3b5bdb] hover:bg-blue-700 text-white font-medium rounded-full transition shadow-sm disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isUpdatingProfile ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Updating...
                </>
              ) : (
                "Update Profile"
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Password Section */}
      <div className="flex flex-col h-full bg-white rounded-[24px] shadow-sm border border-gray-100 p-8 md:p-10 transition-all hover:shadow-md">
        <div className="flex items-center gap-4 mb-2">
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gray-100">
            <KeyRound className="w-5 h-5 text-gray-700" />
          </div>
          <div>
            <h3 className="text-[20px] font-semibold text-gray-800">Change Password</h3>
            <p className="text-[14px] text-gray-500 mt-0.5">Secure your account with a new password.</p>
          </div>
        </div>

        <form onSubmit={handlePasswordSubmit(onPasswordSubmit)} className="flex flex-col space-y-6 mt-8 h-full">
          <div className="space-y-2">
            <label htmlFor="currentpassword" className="text-[15px] font-medium text-gray-700">Current Password</label>
            <Input
              id="currentpassword"
              type="password"
              placeholder="Enter current password"
              className="rounded-xl h-[48px] bg-gray-50/50 border-gray-200 focus-visible:ring-1 focus-visible:ring-gray-800 px-4"
              {...registerPassword("currentpassword")}
            />
            {passwordErrors.currentpassword && (
              <p className="text-sm text-red-500">{passwordErrors.currentpassword.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="newpassword" className="text-[15px] font-medium text-gray-700">New Password</label>
            <Input
              id="newpassword"
              type="password"
              placeholder="Enter new password"
              className="rounded-xl h-[48px] bg-gray-50/50 border-gray-200 focus-visible:ring-1 focus-visible:ring-gray-800 px-4"
              {...registerPassword("newpassword")}
            />
            {passwordErrors.newpassword && (
              <p className="text-sm text-red-500">{passwordErrors.newpassword.message}</p>
            )}
          </div>

          <div className="space-y-2 pb-2">
            <label htmlFor="confirmnewpassword" className="text-[15px] font-medium text-gray-700">Confirm New Password</label>
            <Input
              id="confirmnewpassword"
              type="password"
              placeholder="Confirm new password"
              className="rounded-xl h-[48px] bg-gray-50/50 border-gray-200 focus-visible:ring-1 focus-visible:ring-gray-800 px-4"
              {...registerPassword("confirmnewpassword")}
            />
            {passwordErrors.confirmnewpassword && (
              <p className="text-sm text-red-500">{passwordErrors.confirmnewpassword.message}</p>
            )}
          </div>

          <div className="mt-auto pt-6 border-t border-gray-100">
            <button 
              type="submit" 
              disabled={isUpdatingPassword} 
              className="w-full h-[48px] bg-[#111827] hover:bg-gray-800 text-white font-medium rounded-full transition shadow-sm disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isUpdatingPassword ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Changing Password...
                </>
              ) : (
                "Change Password"
              )}
            </button>
          </div>
        </form>
      </div>

    </div>
  );
}
