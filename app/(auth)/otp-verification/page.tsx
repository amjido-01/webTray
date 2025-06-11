"use client"

import type React from "react"

import { useState } from "react"
import { X, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Image from "next/image"
import logo from "@/public/logo.svg"


export default function Component() {
  const [code, setCode] = useState(["", "", "", "", ""])
  const [showError, setShowError] = useState(true)

  const handleInputChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newCode = [...code]
      newCode[index] = value
      setCode(newCode)

      // Auto-focus next input
      if (value && index < 4) {
        const nextInput = document.getElementById(`code-${index + 1}`)
        nextInput?.focus()
      }
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`)
      prevInput?.focus()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="p-4">
        <div className="flex items-center gap-2">
      <Image src={logo} alt="logo"/>
        
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-col flex items-center justify-start px-8 ">
        <div className="w-full max-w-md space-y-6">
          {/* Error Alert */}
          {showError && (
            <Alert className="bg-[#FDE8E8] p-6 relative">
              <div className=" bg-[#FAC8C8] p-1   rounded-full absolute top-1/3 left-2">

              <AlertTriangle className="h-4 w-4 text-[#EF4444] " />
              </div>
              <AlertDescription className=" pl-4 text-[#1A1A1A] text-[14px]">
                {"Oops, that code doesn't match. Try again or request a new one."}
              </AlertDescription>
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/16 h-6 w-6 p-0 text-[#141B34] bg-[#FAFAFA] rounded-full hover:text-red-800 hover:bg-red-100"
                onClick={() => setShowError(false)}
              >
                
                <X className="h-4 w-4" />
              </Button>
            </Alert>
          )}

          {/* Title and Description */}
          <div className="text-center space-y-3">
            <h1 className="text-[20px] font-semibold text-[#4D4D4D]">Just One More Step to Go</h1>
            <p className="text-gray-600 text-[14px]">
              {"We've sent a code to your email. Enter it below to confirm your account."}
            </p>
          </div>

          {/* Code Input Fields */}
          <div className="flex justify-center gap-3">
            {code.map((digit, index) => (
              <div key={index} className="relative">
                <input
                  id={`code-${index}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-[56px] h-[56px] rounded-[4px] text-center text-lg font-medium border-[1px] border-[#365BEB]  focus:border-[#365BEB] focus:outline-none focus:ring-0 focus:ring-[#365BEB] bg-[#FAFAFA]"
                  placeholder="*"
                />
              </div>
            ))}
          </div>

          {/* Verify Button */}
          <div className="flex items-center justify-center">
            <Button
              className=" px-10 bg-[#111827] hover:bg-slate-900 text-white  rounded-full text-[16px] "
              size="lg"
            >
              Verify & Continue
            </Button>
          </div>

          {/* Resend Link */}
          <div className="text-center">
            <p className="text-gray-600">
              {"Didn't receive code? "}
              <button className="text-blue-600 hover:text-blue-800 font-medium">Resend</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
