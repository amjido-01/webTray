"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff, AlertCircleIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { signinSchema, SigninFormData } from "@/schemas/signin.schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type FormData = SigninFormData;

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<FormData>({
    resolver: yupResolver(signinSchema),
  });

  const watchedFields = watch();

  const isFormFilled =
    watchedFields.email?.trim() && watchedFields.password?.trim();

  const onSubmit = async (data: FormData) => {
    try {
      await login(data);
      setSubmitSuccess(true);
      reset();
      router.push("/dashboard");
    } catch (error) {
      let errorMessage = "Something went wrong";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      setError(errorMessage);
      console.error("Submission error:", errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-grow grid md:grid-cols-2">
        <div className="bg-white p-6 md:p-10 flex items-center justify-center">
          <div className="w-full max-w-md">
            <div className="mb-[40px]">
              <Link href="/">
                <Image
                  src="/webtraylogo.png"
                  width={100}
                  height={100}
                  alt="logo"
                />
              </Link>
            </div>

            <div className="mb-[18px]">
              <h2 className="text-[20px] leading-[24px] font-bold text-[#4D4D4D] mb-2">
                Let’s Get Back to Business
              </h2>
              <p className="text-[#676767] text-[14px] leading-[22px]">
                Access your dashboard to manage inventory, track orders, and
                grow your sales — all in one place.
              </p>
            </div>

            {/* 🔥 Error Alert Section (same as in signup) */}
            {error && (
              <div className="mb-[18px]">
                <Alert variant="destructive">
                  <AlertCircleIcon />
                  <AlertTitle>{error}</AlertTitle>
                  <AlertDescription></AlertDescription>
                </Alert>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Label
                  className="mb-[8px] text-[#1A1A1A] text-[16px] leading-[24px]"
                  htmlFor="email"
                >
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  {...register("email")}
                  aria-invalid={!!errors.email}
                  className="h-[44px] shadow-none text-[14px] leading-[24px] text-[#1A1A1A]"
                />
                {errors.email && (
                  <p className="text-sm mt-[8px] text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <Label
                  className="mb-[8px] text-[#1A1A1A] text-[16px] leading-[24px]"
                  htmlFor="password"
                >
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    {...register("password")}
                    className="pr-10 shadow-none h-[44px]"
                    aria-invalid={!!errors.password}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm mt-[8px] text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {submitSuccess && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md">
                  Logged in successfully!
                </div>
              )}

              <Button
                size="lg"
                type="submit"
                disabled={isSubmitting || !isFormFilled}
                className="w-full md:w-1/2 py-3 my-[54px] text-white font-medium rounded-full bg-gray-900 hover:bg-black"
              >
                {isSubmitting ? "Logging in..." : "Login to Dashboard"}
              </Button>
            </form>

            <p className="text-sm leading-[22px] font-normal text-[#676767]">
              Don’t have an account?{" "}
              <Link
                href="/signup"
                className="text-[#365BEB] hover:text-blue-700 font-medium"
              >
                Create one
              </Link>
            </p>
          </div>
        </div>

        <div className="hidden md:block relative">
          <Image
            src="/login_img.png"
            alt="User logging in"
            fill
            className="object-cover"
            priority
          />
        </div>
      </main>
    </div>
  );
}
