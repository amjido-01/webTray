"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import logo from "@/public/logo.svg";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";

export default function Component() {
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
            We’ve Got You Covered
          </h2>
          <p className="text-[#676767] text-center text-[14px] leading-[22px]">
            Forgot your password? Just enter your email and we’ll send you a
            secure link to reset it, no stress.
          </p>
        </div>
        <form className="space-y-10 w-full ">
          <div>
            <Label
              className="mb-[8px] text-[#1A1A1A] text-[16px] leading-[24px]"
              htmlFor="email"
            >
              Email Address (registered email)
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email address"
              className="h-[44px] mt-2 shadow-none text-[14px] leading-[24px] text-[#1A1A1A]"
            />
          </div>

          {/* Verify Button */}
          <div className="flex items-center justify-center">
            <Button
              className=" px-10 bg-[#111827] hover:bg-slate-900 text-white  rounded-full text-[16px] "
              size="lg"
            >
              Send Reset Link
            </Button>
          </div>

          {/* Resend Link */}
          <div className="text-center">
            <p className="text-gray-600">
              {"Remember your password?"}
              <button className="text-blue-600 hover:text-blue-800 font-medium">
                Log In
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
