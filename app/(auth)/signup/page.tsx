"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import register_img from "@/public/register_img.png"
import logo from "@/public/logo.svg"

const schema = yup.object().shape({
  fullName: yup.string().required("Full Name is required"),
  businessName: yup.string().required("Business Name is required"),
  email: yup.string().email("Invalid email address").required("Email is required"),
  password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
})

type FormData = yup.InferType<typeof schema>

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  })
  
  const watchedFields = watch() // 👈 get all field values

const isFormFilled =
  watchedFields.fullName?.trim() &&
  watchedFields.businessName?.trim() &&
  watchedFields.email?.trim() &&
  watchedFields.password?.trim()


  const onSubmit = async (data: FormData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("Submitted Data:", data)
      setSubmitSuccess(true)
      reset()
      setTimeout(() => setSubmitSuccess(false), 2000)
    } catch (error) {
      console.error("Submission error:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-grow grid md:grid-cols-2">
        <div className="bg-white p-6 md:p-10 flex items-center justify-center">
          <div className="w-full max-w-md">
           <div className="mb-[40px]">
            <Image src={logo} alt="logo" />
           </div>

            <div className="mb-[18px]">
              <h2 className="text-[20px] leading-[24px] font-bold text-[#4D4D4D] mb-2">
                Take Control of Your Business, All from One Place
              </h2>
              <p className="text-[#676767] text-[14px] leading-[22px]">
                Sign up to build your online store, manage your inventory, and start accepting orders — without juggling
                five different tools.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Label className="mb-[8px] text-[#1A1A1A] text-[16px] leading-[24px] font-normal" htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  placeholder="Enter your full name"
                  {...register("fullName")}
                  aria-invalid={!!errors.fullName}
                  className="h-[44px] shadow-none text-[14px] leading-[24px] text-[#1A1A1A]"
                />
                {errors.fullName && <p className="text-sm mt-[8px] text-red-600">{errors.fullName.message}</p>}
              </div>

              <div>
                <Label  className="mb-[8px] text-[#1A1A1A] text-[16px] leading-[24px] font-normal" htmlFor="businessName">Business Name</Label>
                <Input
                  id="businessName"
                  placeholder="Enter your business name"
                  {...register("businessName")}
                  aria-invalid={!!errors.businessName}
                  className="h-[44px] shadow-none text-[14px] leading-[24px] text-[#1A1A1A]"
                />
                {errors.businessName && <p className="text-sm mt-[8px] text-red-600">{errors.businessName.message}</p>}
              </div>

              <div>
                <Label  className="mb-[8px] text-[#1A1A1A] text-[16px] leading-[24px] font-normal" htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  {...register("email")}
                  aria-invalid={!!errors.email}
                  className="h-[44px] shadow-none text-[14px] leading-[24px] text-[#1A1A1A]"
                />
                {errors.email && <p className="text-sm mt-[8px] text-red-600">{errors.email.message}</p>}
              </div>

              <div>
                <Label  className="mb-[8px] text-[#1A1A1A] text-[16px] leading-[24px] font-normal" htmlFor="password">Password</Label>
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
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && <p className="text-sm mt-[8px] text-red-600">{errors.password.message}</p>}
              </div>

              {submitSuccess && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md">
                  Your account has been created successfully!
                </div>
              )}

              <Button
                size="lg"
                type="submit"
                disabled={isSubmitting || !isFormFilled}
                className="w-full md:w-1/2 py-3 my-[54px] text-white font-medium rounded-full bg-gray-900 hover:bg-black"
              >
                {isSubmitting ? "Creating Account..." : "Create My Business Account"}
              </Button>
            </form>

            <p className="text-sm leading-[22px] font-normal text-[#676767]">
              Already have an account?{" "}
              <Link href="/login" className="text-[#365BEB] hover:text-blue-700 font-medium">
                Login
              </Link>
            </p>
          </div>
        </div>

        <div className="hidden md:block relative">
          <Image src={register_img} alt="Business owner using tablet" fill className="object-cover" priority />
        </div>
      </main>
    </div>
  )
}
