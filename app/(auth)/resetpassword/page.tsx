"use client";

import type React from "react";

import { useState } from "react";
import { EyeOff, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import logo from "@/public/logo.svg";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";

export default function Component() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="p-4">
        <div className="flex items-center gap-2">
          <Image src={logo} alt="logo" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-col flex items-center justify-start w-[30%] mx-auto ">
        <div className="mb-[18px]">
          <h2 className="text-[20px] leading-[24px] text-center font-bold text-[#4D4D4D] mb-2">
            Set a Fresh, Secure Password
          </h2>
          <p className="text-[#676767] text-center text-[14px] leading-[22px]">
            Create a new password to access your business dashboard, make it
            something strong but easy for you to remember.
          </p>
        </div>
        <form className="space-y-10 w-full ">
          <div>
            <Label
              className="mb-[8px] text-[#1A1A1A] text-[16px] leading-[24px]"
              htmlFor="password"
            >
              New Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="pr-10 shadow-none h-[44px]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <div>
            <Label
              className="mb-[8px] text-[#1A1A1A] text-[16px] leading-[24px]"
              htmlFor="password"
            >
              Confirm Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="pr-10 shadow-none h-[44px]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Verify Button */}
          <div className="flex items-center justify-center">
            <Button
              className=" px-10 bg-[#111827] hover:bg-slate-900 text-white  rounded-full text-[16px] "
              size="lg"
            >
              Reset Password
            </Button>
          </div>

          {/* Resend Link */}
          <div className="text-center">
            <p className="text-gray-600">
              {"Didn't receive code? "}
              <button className="text-blue-600 hover:text-blue-800 font-medium">
                Resend
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
